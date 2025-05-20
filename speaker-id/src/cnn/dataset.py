import os
from  src.mfcc import mfcc
from sklearn.preprocessing import LabelEncoder
from keras.api.utils import to_categorical
from keras.api.preprocessing.sequence import pad_sequences
import librosa

DATASET_DIR = "../data"

def prepare_dataset(dataset_dir=DATASET_DIR):
    X, y = [], []
    for speaker in os.listdir(dataset_dir):
        speaker_path = os.path.join(dataset_dir, speaker)
        for wav in os.listdir(speaker_path):
            audio_path = os.path.join(speaker_path, wav)
            y_audio, sr = librosa.load(audio_path)
            mfcc_features = mfcc(y=y_audio, sr=sr)
            X.append(mfcc_features)
            y.append(speaker)
    return X, y

def get_dataset():
    X_raw, y = prepare_dataset(DATASET_DIR)
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    y_cat = to_categorical(y_encoded)
    X_padded = pad_sequences(X_raw, padding='post', dtype='float32')
    return X_padded, y_cat