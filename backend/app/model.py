import numpy as np
import librosa
import keras
from keras.api.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
import json
from utils import extract_mfcc, rm_silence
from config import MODEL_PATH, MAX_LEN, SAMPLE_RATE, N_MFCC

# Load model and label encoder
model = keras.models.load_model(MODEL_PATH)

with open("label_encoder.json", "r") as f:
    classes = json.load(f)

le = LabelEncoder()
le.classes_ = np.array(classes)

CONFIDENCE_THRESHOLD = 0.8  # Adjust as needed

def predict_speaker(audio_file):
    y, sr = librosa.load(audio_file, sr=SAMPLE_RATE)
    y = rm_silence(y, sr)
    mfcc = extract_mfcc(y, sr, 20)

    # Ensure shape is (20, 200)
    if mfcc.shape[1] < 200:
        mfcc = np.pad(mfcc, ((0, 0), (0, 200 - mfcc.shape[1])), mode='constant')
    else:
        mfcc = mfcc[:, :200]

    # Final shape: (1, 20, 200, 1)
    input_data = np.expand_dims(np.expand_dims(mfcc, axis=0), axis=-1)

    preds = model.predict(input_data, verbose=0)[0]
    max_conf = np.max(preds)
    pred_index = np.argmax(preds)

    if max_conf < CONFIDENCE_THRESHOLD:
        return "Unknown", max_conf
    else:
        speaker = le.inverse_transform([pred_index])[0]
        return speaker, max_conf

if __name__ == "__main__":
    file = "1.flac"
    speaker, confidence = predict_speaker(file)
    print(f"Predicted: {speaker} (Confidence: {confidence:.2f})")
