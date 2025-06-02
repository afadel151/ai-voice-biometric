import soundfile as sf
import numpy as np
import torch
import os
import json
from scipy.spatial.distance import cosine
from speechbrain.inference.speaker import SpeakerRecognition
from typing import Dict, Any, Optional

# Load model (same as in your backend)
def load_model_safe():
    """Safely load the SpeechBrain model with error handling"""
    try:
        model = SpeakerRecognition.from_hparams(
            source="speechbrain/spkrec-ecapa-voxceleb",
            savedir="pretrained_models/spkrec-ecapa-voxceleb"
        )
        return model
    except OSError as e:
        if "WinError 1314" in str(e):
            print("Windows symlink permission error. Please run as administrator or enable Developer Mode.")
            raise Exception("Windows permission error - see console for solutions")
        else:
            raise e

def load_speakers_db(db_file: str = "speakers_db.json") -> Dict[str, np.ndarray]:
    """Load speaker embeddings from JSON file"""
    if os.path.exists(db_file):
        try:
            with open(db_file, 'r') as f:
                data = json.load(f)
                # Convert embedding lists back to numpy arrays
                for speaker_name in data:
                    data[speaker_name] = np.array(data[speaker_name])
                return data
        except (json.JSONDecodeError, Exception) as e:
            print(f"Error loading speakers database: {e}")
            return {}
    return {}

def identify_speaker(file_path: str, 
                    speaker_embeddings: Dict[str, np.ndarray], 
                    model: SpeakerRecognition,
                    similarity_threshold: float = 0.6) -> Dict[str, Any]:
    """
    Identify speaker from audio file using file path
    
    Args:
        file_path: Path to the audio file
        speaker_embeddings: Dictionary of speaker embeddings
        model: Loaded SpeechBrain model
        similarity_threshold: Minimum similarity score for identification
    
    Returns:
        Dictionary with identification results
    """
    # Validate file path exists
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}", "success": False}
    
    # Validate file format
    if not file_path.lower().endswith(".wav"):
        return {"error": "Only .wav files are supported", "success": False}

    try:
        # Check if we have any registered speakers
        if not speaker_embeddings:
            return {
                "speaker": "unknown", 
                "message": "No speakers registered in database",
                "success": True
            }

        # Read audio file directly from path
        audio_data, sample_rate = sf.read(file_path)
        
        # Check sample rate
        if sample_rate != 16000:
            return {"error": f"Audio must be 16kHz, got {sample_rate}Hz", "success": False}

        # Ensure audio is mono
        if len(audio_data.shape) > 1:
            audio_data = np.mean(audio_data, axis=1)

        # Convert to tensor
        audio_tensor = torch.tensor(audio_data).float()
        if len(audio_tensor.shape) == 1:
            audio_tensor = audio_tensor.unsqueeze(0)

        # Extract embedding
        with torch.no_grad():
            input_embedding = model.encode_batch(audio_tensor)
            input_embedding_vector = input_embedding.squeeze().numpy()

        # Find best match
        best_speaker = "unknown"
        best_score = -1.0

        for speaker_name, stored_embedding in speaker_embeddings.items():
            try:
                # Calculate cosine similarity (1 - cosine distance)
                similarity = 1 - cosine(input_embedding_vector, stored_embedding)
                
                if similarity > best_score:
                    best_score = similarity
                    best_speaker = speaker_name
                    
            except Exception as e:
                print(f"Error calculating similarity for {speaker_name}: {e}")
                continue

        # Check if similarity meets threshold
        if best_score < similarity_threshold:
            return {
                "speaker": "unknown",
                "best_match": best_speaker,
                "similarity": round(best_score, 4),
                "threshold": similarity_threshold,
                "message": f"Best match '{best_speaker}' below threshold",
                "file_path": file_path,
                "success": True
            }
        else:
            confidence = round(best_score * 100, 2)
            return {
                "speaker": best_speaker,
                "confidence": confidence,
                "similarity": round(best_score, 4),
                "file_path": file_path,
                "success": True
            }

    except Exception as e:
        return {"error": f"Processing error: {str(e)}", "success": False}

# Example usage/test function
def test_speaker_identification():
    """Example test function"""
    # Load model and speaker database
    print("Loading model...")
    model = load_model_safe()
    
    print("Loading speaker database...")
    speaker_embeddings = load_speakers_db("speakers_db.json")
    
    print(f"Found {len(speaker_embeddings)} registered speakers: {list(speaker_embeddings.keys())}")
    
    # Test with an audio file
    test_file_path = "kaba_test2.wav"  # Replace with actual path
    
    if os.path.exists(test_file_path):
        print(f"\nTesting identification with: {test_file_path}")
        result = identify_speaker(test_file_path, speaker_embeddings, model)
        
        if result["success"]:
            if result["speaker"] != "unknown":
                print(f"✅ Identified speaker: {result['speaker']} (confidence: {result.get('confidence', 'N/A')}%)")
            else:
                print(f"❓ Speaker unknown - {result.get('message', 'No match found')}")
        else:
            print(f"❌ Error: {result['error']}")
    else:
        print(f"Test file not found: {test_file_path}")

if __name__ == "__main__":
    test_speaker_identification()