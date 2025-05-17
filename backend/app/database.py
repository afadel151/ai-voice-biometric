from pymongo import MongoClient
from app.config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client["speaker_db"]
collection = db["embeddings"]

def insert_embedding(speaker, embedding):
    collection.insert_one({"speaker": speaker, "embedding": embedding.tolist()})

def get_all_embeddings():
    return list(collection.find({}))
