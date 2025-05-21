import os
from src.mfcc import mfcc
import sqlite3
DATASET_DIR= "data"
from src.audio_utils import load_and_preprocess

def prepare_dataset(path=DATASET_DIR):
    X, y = [], []
    speakers = os.listdir(path)
    for speaker in speakers:
        speaker_name = get_speaker_name_from_db(speaker)
        speaker_subdir = os.path.join(path, speaker)
        for audio_dir in os.listdir(speaker_subdir):
            audio_subdir = os.path.join(speaker_subdir, audio_dir)
            for audio in os.listdir(audio_subdir):
                audio_path = os.path.join(audio_subdir, audio)
                if audio.endswith('.flac'):
                    abs_path = os.path.abspath(audio_path)
                    y_audio, sr = load_and_preprocess(abs_path)
                    mfcc_features = mfcc(signal=y_audio, sample_rate=sr)
                    X.append(mfcc_features)
                    y.append(speaker_name)
    return X,y

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

