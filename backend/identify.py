from fastapi import FastAPI, File, UploadFile
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

SPEAKERS_DB_FILE = "speakers_db.json"


import os
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

speaker_embeddings = load_speakers_db()
def add_speaker(speaker_name: str, file_path: str):
    """Add a new speaker to the database using file path"""
    if not speaker_name or not speaker_name.strip():
        return JSONResponse(content={"error": "Speaker name cannot be empty"}, status_code=400)
    
    speaker_name = speaker_name.strip()
    
    if not os.path.exists(file_path):
        return JSONResponse(content={"error": f"File not found: {file_path}"}, status_code=400)
    
    if not file_path.lower().endswith(".wav"):
        return JSONResponse(content={"error": "Only .wav files are supported"}, status_code=400)

    try:
        audio_data, sample_rate = sf.read(file_path)
        
        if sample_rate != 16000:
            return JSONResponse(
                content={"error": f"Audio must be 16kHz, got {sample_rate}Hz"}, 
                status_code=400
            )

        if len(audio_data.shape) > 1:
            audio_data = np.mean(audio_data, axis=1)

        audio_tensor = torch.tensor(audio_data).float()
        if len(audio_tensor.shape) == 1:
            audio_tensor = audio_tensor.unsqueeze(0)
        with torch.no_grad():
            embedding = model.encode_batch(audio_tensor)
            embedding_vector = embedding.squeeze().numpy()
        speaker_embeddings[speaker_name] = embedding_vector
        save_speakers_db(speaker_embeddings)
        
        return JSONResponse(
            content={
                "message": f"Speaker '{speaker_name}' added successfully",
                "embedding_shape": embedding_vector.shape,
                "file_path": file_path
            }, 
            status_code=200
        )
        
    except Exception as e:
        return JSONResponse(content={"error": f"Processing error: {str(e)}"}, status_code=500)
def identify(file: UploadFile = File(...)):
    """Identify speaker from audio file"""
    # Validate file format
    if not file.filename.lower().endswith(".wav"):
        return JSONResponse(content={"error": "Only .wav files are supported"}, status_code=400)

    try:
        if not speaker_embeddings:
            return JSONResponse(
                content={
                    "speaker": "unknown", 
                    "message": "No speakers registered in database"
                }, 
                status_code=404
            )

        audio_data, sample_rate = sf.read(file.file)
        
        if sample_rate != 16000:
            return JSONResponse(
                content={"error": f"Audio must be 16kHz, got {sample_rate}Hz"}, 
                status_code=400
            )

        if len(audio_data.shape) > 1:
            audio_data = np.mean(audio_data, axis=1)

        audio_tensor = torch.tensor(audio_data).float()
        if len(audio_tensor.shape) == 1:
            audio_tensor = audio_tensor.unsqueeze(0)

        with torch.no_grad():
            input_embedding = model.encode_batch(audio_tensor)
            input_embedding_vector = input_embedding.squeeze().numpy()
        best_speaker = "unknown"
        best_score = -1.0
        similarity_threshold = 0.6  

        for speaker_name, stored_embedding in speaker_embeddings.items():
            try:
                similarity = 1 - cosine(input_embedding_vector, stored_embedding)
                
                if similarity > best_score:
                    best_score = similarity
                    best_speaker = speaker_name
                    
            except Exception as e:
                print(f"Error calculating similarity for {speaker_name}: {e}")
                continue

        if best_score < similarity_threshold:
            return JSONResponse(
                content={
                    "speaker": "unknown",
                    "best_match": best_speaker,
                    "similarity": round(best_score, 4),
                    "threshold": similarity_threshold,
                    "message": f"Best match '{best_speaker}' below threshold"
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
        return JSONResponse(content={"error": f"Processing error: {str(e)}"}, status_code=500)
if __name__ == "__main__":
    add_speaker("Ammar","kaba_add.wav")