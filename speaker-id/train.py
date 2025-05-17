import os
from sklearn.preprocessing import LabelEncoder
from keras.api.utils import to_categorical
from keras.api.preprocessing.sequence import pad_sequences
import numpy as np
from src.audio_utils import load_and_preprocess
from src.feature_extraction import extract_mfccs
from src.tdnn_model import build_tdnn_model

DATASET_DIR = "data"

def prepare_dataset():
    X, y = [], []
    for speaker in os.listdir(DATASET_DIR):
        speaker_path = os.path.join(DATASET_DIR, speaker)
        for wav in os.listdir(speaker_path):
            audio_path = os.path.join(speaker_path, wav)
            y_audio, sr = load_and_preprocess(audio_path)
            mfcc = extract_mfccs(y_audio, sr)
            X.append(mfcc)
            y.append(speaker)
    return X, y

X_raw, y = prepare_dataset()
le = LabelEncoder()
y_encoded = le.fit_transform(y)
y_cat = to_categorical(y_encoded)

X_padded = pad_sequences(X_raw, padding='post', dtype='float32')
input_shape = X_padded.shape[1:]
num_classes = y_cat.shape[1]

model = build_tdnn_model(input_shape, num_classes)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_padded, y_cat, epochs=10, batch_size=32)
model.save('tdnn_speaker_model.h5')
