import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from app.database import get_all_embeddings

def identify_speaker(embedding, threshold=0.75):
    records = get_all_embeddings()
    scores = []

    for record in records:
        db_embedding = np.array(record["embedding"])
        sim = cosine_similarity([embedding], [db_embedding])[0][0]
        scores.append((record["speaker"], sim))

    if not scores:
        return "unknown", 0

    best_match = max(scores, key=lambda x: x[1])
    return (best_match if best_match[1] > threshold else ("unknown", best_match[1]))
