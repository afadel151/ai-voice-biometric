from fastapi import FastAPI, File, UploadFile, HTTPException,Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import soundfile as sf
import numpy as np
from speechbrain.inference.speaker import SpeakerRecognition
import torch
import os
import json
from scipy.spatial.distance import cosine
from typing import Dict, Any
import traceback

import io
from pydub import AudioSegment

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database file path
SPEAKERS_DB_FILE = "speakers_db.json"

# Load pretrained ECAPA-TDNN model from SpeechBrain
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

def load_model_safe():
    """Safely load the SpeechBrain model with error handling"""
    try:
        from speechbrain.utils.fetching import LocalStrategy
        model = SpeakerRecognition.from_hparams(
            source="speechbrain/spkrec-ecapa-voxceleb",
            savedir="pretrained_models/spkrec-ecapa-voxceleb"
        )
        return model
    except OSError as e:
        if "WinError 1314" in str(e):
            print("Windows symlink permission error. Please run as administrator or enable Developer Mode.")
            print("Alternatively, try running: pip install --upgrade speechbrain")
            raise Exception("Windows permission error - see console for solutions")
        else:
            raise e

model = load_model_safe()

def load_speakers_db() -> Dict[str, Any]:
    """Load speaker embeddings from JSON file"""
    if os.path.exists(SPEAKERS_DB_FILE):
        try:
            with open(SPEAKERS_DB_FILE, 'r') as f:
                data = json.load(f)
                for speaker_name in data:
                    data[speaker_name] = np.array(data[speaker_name])
                return data
        except (json.JSONDecodeError, Exception) as e:
            print(f"Error loading speakers database: {e}")
            return {}
    return {}

def save_speakers_db(speaker_embeddings: Dict[str, np.ndarray]) -> None:
    """Save speaker embeddings to JSON file"""
    try:
        serializable_data = {}
        for speaker_name, embedding in speaker_embeddings.items():
            serializable_data[speaker_name] = embedding.tolist()
        with open(SPEAKERS_DB_FILE, 'w') as f:
            json.dump(serializable_data, f, indent=2)
    except Exception as e:
        print(f"Error saving speakers database: {e}")

# Load existing speaker embeddings
speaker_embeddings = load_speakers_db()

@app.get("/")
async def root():
    return {"message": "Welcome to the Speaker Identification API"}

@app.get("/speakers")
async def get_speakers():
    """Get list of registered speakers"""
    return {"speakers": list(speaker_embeddings.keys()), "count": len(speaker_embeddings)}


@app.post("/add_speaker")
async def add_speaker(speaker_name: str= Form(...), file: UploadFile = File(...)):
    """Add a new speaker to the database by converting MP4 to WAV"""
    try:
        # Validate input
        if not speaker_name or not speaker_name.strip():
            raise HTTPException(status_code=400, detail="Speaker name cannot be empty")
        
        speaker_name = speaker_name.strip()
        
        # Validate file format
        if not file.filename.lower().endswith((".mp4", ".m4a")):
            raise HTTPException(status_code=400, detail="Only .mp4 or .m4a files are supported")

        # Validate file size
        file_content = await file.read()
        if len(file_content) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File size exceeds 10MB limit")

        # Convert MP4 to WAV
        print(f"Converting {file.filename} to WAV...")
        audio = AudioSegment.from_file(io.BytesIO(file_content), format="mp4")
        
        # Validate duration
        duration_ms = len(audio)
        if duration_ms < 3000:
            raise HTTPException(status_code=400, detail="Audio duration must be at least 3 seconds")
        
        # Convert to mono and set sample rate
        audio = audio.set_channels(1).set_frame_rate(16000)
        
        # Export to WAV
        wav_buffer = io.BytesIO()
        audio.export(wav_buffer, format="wav")
        wav_buffer.seek(0)
        
        # Read WAV data
        audio_data, sample_rate = sf.read(wav_buffer)
        
        # Verify sample rate
        if sample_rate != 16000:
            raise HTTPException(status_code=400, detail=f"Converted audio must be 16kHz, got {sample_rate}Hz")

        # Ensure audio is mono
        if len(audio_data.shape) > 1:
            audio_data = np.mean(audio_data, axis=1)

        # Convert to tensor
        audio_tensor = torch.tensor(audio_data).float()
        if len(audio_tensor.shape) == 1:
            audio_tensor = audio_tensor.unsqueeze(0)

        # Extract embedding (assuming `model` is defined)
        with torch.no_grad():
            embedding = model.encode_batch(audio_tensor)
            embedding_vector = embedding.squeeze().numpy()

        # Store embedding (assuming `speaker_embeddings` and `save_speakers_db` are defined)
        speaker_embeddings[speaker_name] = embedding_vector
        save_speakers_db(speaker_embeddings)
        
        return {
            "message": f"Speaker '{speaker_name}' added successfully",
            "embedding_shape": embedding_vector.shape,
            "duration_ms": duration_ms
        }
        
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error processing speaker addition: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")

@app.post("/identify")
async def identify(file: UploadFile = File(...)):
    """Identify speaker from audio file (supports MP4 and WAV)"""
    print(f"=== IDENTIFY REQUEST ===")
    print(f"Received file: {file.filename}")
    print(f"Content type: {file.content_type}")
    
    try:
        allowed_formats = [".wav", ".mp4", ".m4a", ".mp3"]
        file_extension = file.filename.lower().split('.')[-1] if '.' in file.filename else ''
        print(f"File extension: {file_extension}")
        
        if f".{file_extension}" not in allowed_formats:
            return JSONResponse(
                content={"error": f"Unsupported file format. Supported: {', '.join(allowed_formats)}"}, 
                status_code=400
            )

        if not speaker_embeddings:
            return JSONResponse(
                content={"speaker": "unknown", "message": "No speakers registered in database"},
                status_code=404
            )

        file_content = await file.read()
        print(f"File size: {len(file_content)} bytes")
        
        if file_extension != "wav":
            print(f"Converting {file_extension} to WAV...")
            try:
                if file_extension == "mp4":
                    audio = AudioSegment.from_file(io.BytesIO(file_content), format="mp4")
                elif file_extension == "m4a":
                    audio = AudioSegment.from_file(io.BytesIO(file_content), format="m4a")
                elif file_extension == "mp3":
                    audio = AudioSegment.from_file(io.BytesIO(file_content), format="mp3")
                
                print(f"Original audio: {audio.frame_rate}Hz, {audio.channels} channels, {len(audio)}ms")
                
                audio = audio.set_channels(1).set_frame_rate(16000)
                
                print(f"Converted audio: {audio.frame_rate}Hz, {audio.channels} channels")
                
                wav_buffer = io.BytesIO()
                audio.export(wav_buffer, format="wav")
                wav_buffer.seek(0)
                
                audio_data, sample_rate = sf.read(wav_buffer)
                print(f"Audio data shape: {audio_data.shape}, sample_rate: {sample_rate}")
                
            except Exception as conversion_error:
                print(f"Conversion error: {conversion_error}")
                traceback.print_exc()
                return JSONResponse(
                    content={"error": f"Audio conversion failed: {str(conversion_error)}"},
                    status_code=400
                )
            
        else:
            print("Processing WAV file directly...")
            audio_data, sample_rate = sf.read(io.BytesIO(file_content))
            print(f"WAV audio data shape: {audio_data.shape}, sample_rate: {sample_rate}")
            
            if sample_rate != 16000:
                return JSONResponse(
                    content={"error": f"WAV audio must be 16kHz, got {sample_rate}Hz"},
                    status_code=400
                )
            
            if len(audio_data.shape) > 1:
                print("Converting WAV to mono...")
                audio_data = np.mean(audio_data, axis=1)

        print("Converting to tensor...")
        audio_tensor = torch.tensor(audio_data).float()
        if len(audio_tensor.shape) == 1:
            audio_tensor = audio_tensor.unsqueeze(0)
        print(f"Audio tensor shape: {audio_tensor.shape}")

        print("Extracting embedding...")
        with torch.no_grad():
            input_embedding = model.encode_batch(audio_tensor)
            input_embedding_vector = input_embedding.squeeze().numpy()
        print(f"Embedding shape: {input_embedding_vector.shape}")

        print("Finding best match...")
        best_speaker = "unknown"
        best_score = -1.0
        similarity_threshold = 0.5

        for speaker_name, stored_embedding in speaker_embeddings.items():
            try:
                similarity = 1 - cosine(input_embedding_vector, stored_embedding)
                print(f"Similarity with {speaker_name}: {similarity}")
                
                if similarity > best_score:
                    best_score = similarity
                    best_speaker = speaker_name
                    
            except Exception as e:
                print(f"Error calculating similarity for {speaker_name}: {e}")
                continue

        print(f"Best match: {best_speaker} with score: {best_score}")

        if best_score < similarity_threshold:
            return JSONResponse(
                content={
                    "speaker": "unknown stylizeds0t0eunknown",
                    "best_match": best_speaker,
                    "similarity": round(best_score, 4),
                    "threshold": similarity_threshold,
                    "message": f"Best match '{best_speaker}' below threshold",
                    "confidence": 0
                },
                status_code=200
            )
        else:
            confidence = round(best_score * 100, 2)
            return JSONResponse(
                content={
                    "speaker": best_speaker,
                    "confidence": confidence,
                    "similarity": round(best_score, 4)
                },
                status_code=200
            )

    except Exception as e:
        print(f"=== ERROR ===")
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return JSONResponse(
            content={"error": f"Processing error: {str(e)}"},
            status_code=500
        )

@app.delete("/speaker/{speaker_name}")
async def delete_speaker(speaker_name: str):
    """Delete a speaker from the database"""
    if speaker_name in speaker_embeddings:
        del speaker_embeddings[speaker_name]
        save_speakers_db(speaker_embeddings)
        return JSONResponse(
            content={"message": f"Speaker '{speaker_name}' deleted successfully"},
            status_code=200
        )
    else:
        return JSONResponse(
            content={"error": f"Speaker '{speaker_name}' not found"},
            status_code=404
        )

@app.put("/update_threshold")
async def update_threshold(threshold: float):
    """Update similarity threshold (for testing purposes)"""
    if 0.0 <= threshold <= 1.0:
        return JSONResponse(
            content={"message": f"Threshold would be updated to {threshold} (implement as needed)"},
            status_code=200
        )
    else:
        return JSONResponse(
            content={"error": "Threshold must be between 0.0 and 1.0"},
            status_code=400
        )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)