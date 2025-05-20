from keras.api.preprocessing.sequence import pad_sequences
import numpy as np
from src.audio_utils import load_and_preprocess
from mfcc import mfcc
from src.database import insert_embedding

def extract_embedding(audio_path, model, max_len):
    y, sr = load_and_preprocess(audio_path)
    mfcc_features = mfcc(y, sr)
    padded = pad_sequences([mfcc_features], maxlen=max_len, padding='post', dtype='float32')
    return model.predict(padded)[0]

def add_new_speaker(model, speaker, audio_paths, max_len):
    embeddings = [extract_embedding(p, model, max_len) for p in audio_paths]
    avg_embedding = np.mean(embeddings, axis=0)
    insert_embedding(speaker, avg_embedding)
    return
