import tensorflow as tf
from keras.api.preprocessing.sequence import pad_sequences
from app.utils import extract_mfcc, rm_silence
from app.config import MODEL_PATH, MAX_LEN, SAMPLE_RATE, N_MFCC
import librosa

model = tf.keras.models.load_model(MODEL_PATH)

def get_embedding(audio_file):
    y, sr = librosa.load(audio_file, sr=SAMPLE_RATE)
    y = rm_silence(y, sr)
    mfcc = extract_mfcc(y, sr, N_MFCC)
    padded = pad_sequences([mfcc], maxlen=MAX_LEN, padding='post', dtype='float32')
    return model.predict(padded)[0]
