import sys
import numpy as np
from keras.api.models import load_model
from src.embeddings import extract_embedding
from src.database import get_all_embeddings
from src.utils import cosine_similarity

THRESHOLD = 0.7 

def identify_speaker(model, audio_path, max_len):
    test_embedding = extract_embedding(audio_path, model, max_len)
    db_entries = get_all_embeddings()
    
    best_score = -1
    best_speaker = "unknown"
 
    for entry in db_entries:
        db_embedding = np.array(entry['embedding'])
        sim = cosine_similarity(test_embedding, db_embedding)
        if sim > best_score:
            best_score = sim
            best_speaker = entry['speaker']

    if best_score >= THRESHOLD:
        return best_speaker, best_score
    else:
        return "unknown", best_score


if __name__ == "__main__":
    audio_path = sys.argv[1]  
    model = load_model("tdnn_speaker_model.h5")
    speaker, score = identify_speaker(model, audio_path, max_len=300)
    print(f"Identified: {speaker} (score: {score:.2f})")
