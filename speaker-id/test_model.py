import keras
import json
from sklearn.preprocessing import LabelEncoder
import numpy as np
import os
import librosa
import sqlite3
import csv
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

DATASET_DIR='data'
N_MFCCS=40
N_FRAMES=100
def csv_to_db():
    csv_file = "speakers.csv"
    db_file = "database.db"

    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS speakers (
            ID INTEGER PRIMARY KEY,
            SEX TEXT,
            SUBSET TEXT,
            MINUTES REAL,
            NAME TEXT
        )
    ''')
    with open(csv_file, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        header = next(csv_reader)  
        for row in csv_reader:
            if len(row) == 5:  
                cursor.execute('''
                    INSERT OR REPLACE INTO speakers (ID, SEX, SUBSET, MINUTES, NAME)
                    VALUES (?, ?, ?, ?, ?)
                ''', (int(row[0]), row[1], row[2], float(row[3]), row[4]))

    conn.commit()
    conn.close()

    print(f"Data successfully imported from {csv_file} to {db_file}")
    return 


def rm_silence(input_file, sr, top_db=30):
    y, sr = librosa.load(input_file, sr=sr)
    intervals = librosa.effects.split(y, top_db=top_db)
    non_silent_audio = np.concatenate([y[start:end] for start, end in intervals])
    return non_silent_audio

def load_and_preprocess(audio_path, sr=16000, top_db=30):
    y_trimmed = rm_silence(audio_path, sr=sr, top_db=top_db)
    return y_trimmed, sr

def load_model():
    model_path = os.path.join(os.path.dirname(__file__), 'model.keras')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    return keras.models.load_model(model_path)

def load_label_encoder():
    filename = os.path.join(os.path.dirname(__file__), 'label_encoder.json')
    with open(filename, 'r') as f:
        data = json.load(f)
    label_encoder = LabelEncoder()
    label_encoder.classes_ = np.array(data)
    print('label_encoder shape:',label_encoder.classes_.shape)
    return label_encoder

def get_speaker_name_from_db(speaker):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT name FROM speakers WHERE id=?", (speaker,))
    result = cursor.fetchone()
    connection.close()
    if result:
        return result[0]
    else:
        return None


def prepare_dataset(path=DATASET_DIR,n_mfccs=N_MFCCS,n_frames=N_FRAMES):
    X, y = [], []
    speakers = os.listdir(path)
    for speaker in speakers:
        speaker_name = get_speaker_name_from_db(speaker)
        print(speaker_name)
        speaker_subdir = os.path.join(path, speaker)
        for audio_dir in os.listdir(speaker_subdir):
            audio_subdir = os.path.join(speaker_subdir, audio_dir)
            for audio in os.listdir(audio_subdir):  
                audio_path = os.path.join(audio_subdir, audio)
                if audio.endswith('.flac'):
                    abs_path = os.path.abspath(audio_path)
                    y_audio, sr = load_and_preprocess(abs_path)
                    mfcc_features = librosa.feature.mfcc(y=y_audio, sr=sr, n_mfcc=n_mfccs)
                    if mfcc_features.shape[1] < n_frames:
                        pad_width = n_frames - mfcc_features.shape[1]
                        mfcc_features = np.pad(mfcc_features, ((0, 0), (0, pad_width)), mode='constant')
                    else:
                        mfcc_features = mfcc_features[:, :n_frames]
                    X.append(mfcc_features)
                    y.append(speaker)
                    break
            break
    return X,y

def identify_speaker(mfcc_features,model, threshold=0.75):
    mfcc_features = mfcc_features.reshape(1, 40, 100, 1)
    print("MFCC features shape:", mfcc_features.shape)
    predictions = model.predict(mfcc_features)
    probabilities = predictions[0]
    max_index = np.argmax(probabilities)
    filename = os.path.join(os.path.dirname(__file__), 'label_encoder.json')
    with open(filename, 'r') as f:
        data = json.load(f)
    label_encoder = LabelEncoder()
    label_encoder.classes_ = np.array(data)
    max_probability = probabilities[max_index]
    if max_probability >= threshold:
        print(max_probability)
        speaker_id = label_encoder.inverse_transform(np.array([max_index]))[0]
        return speaker_id
    else:
        return 'unknown', max_probability
    
if __name__=='__main__':
    # X,y = prepare_dataset()
    path = "1.flac"
    n_frames=100
    n_mfccs= 40
    y_audio, sr = load_and_preprocess(path)
    mfcc_features = librosa.feature.mfcc(y=y_audio, sr=sr, n_mfcc=n_mfccs)
    if mfcc_features.shape[1] < n_frames:
        pad_width = n_frames - mfcc_features.shape[1]
        mfcc_features = np.pad(mfcc_features, ((0, 0), (0, pad_width)), mode='constant')
    else:
        mfcc_features = mfcc_features[:, :n_frames]
    model = load_model()
    speaker = identify_speaker(mfcc_features, model)
    print(speaker)
    # Real,Identified = [],[]
    # for i in range(len(X)):
    #     print(X[i].shape)
    #     print(y[i])
    #     Real.append(y[i])
    #     speaker = identify_speaker(X[i], model)
    #     print(speaker)
    #     Identified.append(speaker)
    # Real_flat = [r[0] if isinstance(r, (tuple, list)) else r for r in Real]
    # Identified_flat = [i[0] if isinstance(i, (tuple, list)) else i for i in Identified] 
    # plt.figure(figsize=(12, 6))
    # plt.plot(Real_flat, label='Real', marker='o')
    # plt.plot(Identified_flat, label='Identified', marker='x')
    # plt.title('Real vs Identified Speakers')
    # plt.xlabel('Sample Index')
    # plt.ylabel('Speaker ID')
    # plt.legend()
    # plt.grid(True)
    # plt.show()
    
    
        
        