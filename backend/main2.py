from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
from contextlib import asynccontextmanager
import uvicorn
import soundfile as sf
import numpy as np
from speechbrain.inference.speaker import SpeakerRecognition
import torch
import sqlite3
import logging
import os
from scipy.spatial.distance import cosine
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import Dict
import redis.asyncio as redis
import uuid

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Database configuration
DB_PATH = os.getenv("DB_PATH", "speakers.db")
SIMILARITY_THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", 0.6))

# Initialize FastAPI app
app = FastAPI(title="Speaker Identification API", description="API for adding and identifying speakers using ECAPA-TDNN")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Redis for rate limiting
@asynccontextmanager
async def lifespan(app: FastAPI):
    redis_instance = redis.from_url("redis://localhost:6379", encoding="utf-8", decode_responses=True)
    await FastAPILimiter.init(redis_instance)
    yield
    await FastAPILimiter.close()

app.lifespan = lifespan

# Initialize database
def init_db():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute("""
                CREATE TABLE IF NOT EXISTS speakers (
                    id TEXT PRIMARY KEY,
                    name TEXT UNIQUE,
                    embedding BLOB
                )
            """)
            conn.commit()
            logger.info("Database initialized successfully")
    except sqlite3.Error as e:
        logger.error(f"Database initialization failed: {e}")
        raise

init_db()

# Load pretrained ECAPA-TDNN model
try:
    model = SpeakerRecognition.from_hparams(
        source="speechbrain/spkrec-ecapa-voxceleb",
        savedir="pretrained_models/spkrec-ecapa-voxceleb"
    )
    logger.info("ECAPA-TDNN model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load ECAPA-TDNN model: {e}")
    raise

# Load speaker embeddings from database
def load_speaker_embeddings() -> Dict[str, np.ndarray]:
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute("SELECT name, embedding FROM speakers")
            embeddings = {}
            for name, embedding_blob in c.fetchall():
                embedding = np.frombuffer(embedding_blob, dtype=np.float32)
                embeddings[name] = embedding
            logger.info(f"Loaded {len(embeddings)} speaker embeddings from database")
            return embeddings
    except sqlite3.Error as e:
        logger.error(f"Failed to load speaker embeddings: {e}")
        return {}

speaker_embeddings = load_speaker_embeddings()

# Pydantic model for request validation
class SpeakerAddRequest(BaseModel):
    speaker_name: str

@app.get("/", summary="Root endpoint")
async def root():
    return {"message": "Welcome to the Speaker Identification API"}

@app.post(
    "/add_speaker",
    summary="Add a new speaker",
    dependencies=[Depends(RateLimiter(times=10, seconds=60))],  # 10 requests per minute
)
async def add_speaker(request: SpeakerAddRequest, file: UploadFile = File(...)):
    speaker_name = request.speaker_name.strip()
    if not speaker_name:
        raise HTTPException(status_code=400, detail="Speaker name cannot be empty")
    
    # Check for duplicate speaker
    if speaker_name in speaker_embeddings:
        raise HTTPException(status_code=400, detail=f"Speaker {speaker_name} already exists")

    # Validate file format
    if not file.filename.endswith(".wav"):
        raise HTTPException(status_code=400, detail="Only .wav files are supported")

    try:
        # Read and validate audio
        audio_data, sample_rate = sf.read(file.file)
        if sample_rate != 16000:
            raise HTTPException(status_code=400, detail="Audio must be 16kHz")
        
        audio_tensor = torch.tensor(audio_data).float()
        if len(audio_tensor.shape) == 1:
            audio_tensor = audio_tensor.unsqueeze(0)
        
        # Extract embedding
        embedding = model.encode_batch(audio_tensor)[0, 0].numpy()
        
        # Save to database
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            speaker_id = str(uuid.uuid4())
            c.execute(
                "INSERT INTO speakers (id, name, embedding) VALUES (?, ?, ?)",
                (speaker_id, speaker_name, embedding.tobytes())
            )
            conn.commit()
            logger.info(f"Added speaker {speaker_name} with ID {speaker_id}")
        
        # Update in-memory embeddings
        speaker_embeddings[speaker_name] = embedding
        return JSONResponse(
            content={"message": f"Speaker {speaker_name} added successfully", "speaker_id": speaker_id},
            status_code=200
        )
    except Exception as e:
        logger.error(f"Error adding speaker {speaker_name}: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post(
    "/identify",
    summary="Identify a speaker from audio",
    dependencies=[Depends(RateLimiter(times=20, seconds=60))],  # 20 requests per minute
)
async def identify(file: UploadFile = File(...)):
    if not file.filename.endswith(".wav"):
        raise HTTPException(status_code=400, detail="Only .wav files are supported")

    try:
        # Read and validate audio
        audio_data, sample_rate = sf.read(file.file)
        if sample_rate != 16000:
            raise HTTPException(status_code=400, detail="Audio must be 16kHz")
        
        audio_tensor = torch.tensor(audio_data).float()
        if len(audio_tensor.shape) == 1:
            audio_tensor = audio_tensor.unsqueeze(0)
        
        # Extract embedding
        input_embedding = model.encode_batch(audio_tensor)[0, 0].numpy()

        if not speaker_embeddings:
            logger.info("No speakers registered")
            return JSONResponse(content={"speaker": "unknown"}, status_code=404)

        # Compute similarities using NumPy for efficiency
        similarities = {
            name: 1 - cosine(input_embedding, stored_embedding)
            for name, stored_embedding in speaker_embeddings.items()
        }
        
        # Find best match
        best_speaker = max(similarities.items(), key=lambda x: x[1], default=("unknown", float("-inf")))
        best_score = best_speaker[1]
        best_speaker_name = best_speaker[0]

        if best_score < SIMILARITY_THRESHOLD:
            logger.info(f"Speaker identification failed: best score {best_score} below threshold")
            return JSONResponse(content={"speaker": "unknown"}, status_code=404)
        
        probability = round(best_score * 100, 2)
        logger.info(f"Identified speaker {best_speaker_name} with probability {probability}%")
        return JSONResponse(
            content={"speaker": best_speaker_name, "probability": probability},
            status_code=200
        )
    except Exception as e:
        logger.error(f"Error identifying speaker: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)