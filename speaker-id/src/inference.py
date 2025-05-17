from sklearn.metrics.pairwise import cosine_similarity
from src.embeddings import extract_embedding
from src.database import get_all_embeddings

def identify_speaker(audio_path, model, max_len, threshold=0.7):
    new_embedding = extract_embedding(audio_path, model, max_len)
    candidates = get_all_embeddings()

    best_match = 'unknown'
    best_score = 0

    for person in candidates:
        emb = person['embedding']
        score = cosine_similarity([new_embedding], [emb])[0][0]
        if score > best_score and score > threshold:
            best_score = score
            best_match = person['speaker']

    return best_match
