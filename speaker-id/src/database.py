from pymongo import MongoClient
import numpy as np

client = MongoClient('mongodb://localhost:27017/')
db = client['speaker_db']
collection = db['embeddings']

def insert_embedding(speaker, embedding):
    collection.insert_one({'speaker': speaker, 'embedding': embedding.tolist()})

def get_all_embeddings():
    return list(collection.find({}))
