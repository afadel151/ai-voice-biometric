from keras.api.preprocessing.sequence import pad_sequences
from utils import extract_mfcc, rm_silence
from config import MODEL_PATH, MAX_LEN, SAMPLE_RATE, N_MFCC
import librosa
import keras
import numpy as np
model = keras.models.load_model(MODEL_PATH)
def get_embedding(audio_file):
    y, sr = librosa.load(audio_file, sr=SAMPLE_RATE)
    y = rm_silence(y, sr)
    mfcc = extract_mfcc(y, sr, N_MFCC)
    padded = pad_sequences([mfcc], maxlen=MAX_LEN, padding='post', dtype='float32')
    return model.predict(padded)[0]
# im predicting with CNN model , i want to return unknown if the model is not confident enough, otherwie it returns the speaker's name which is the result of the prediction


from sklearn.preprocessing import LabelEncoder
import json

# Suppose your Y is a list of speaker names



# Save the encoder
with open("label_encoder.json", "r") as f:
    classes = json.load(f)
    
    
le = LabelEncoder()
le.classes_ = np.array(classes)
def predict_speaker(audio_file):
    y, sr = librosa.load(audio_file, sr=SAMPLE_RATE)
    y = rm_silence(y, sr)
    mfcc = extract_mfcc(y, sr, N_MFCC)
    padded = pad_sequences([mfcc], maxlen=MAX_LEN, padding='post', dtype='float32')
    predictions = model.predict(padded)
    return predictions[0]

if __name__ == "__main__":
    audio_file = "58.flac"
    predictions = predict_speaker(audio_file)
    print(predictions)
    max_confidence = max(predictions)

    if max_confidence < 0.8:
        print("unknown")
    else:
        predicted_index = predictions.argmax()
        speaker_name = le.inverse_transform([predicted_index])[0]
        print(speaker_name)
