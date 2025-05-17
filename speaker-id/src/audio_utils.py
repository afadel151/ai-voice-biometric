import librosa
import numpy as np


def rm_silence(input_file, sr, top_db=30):
    y, sr = librosa.load(input_file, sr=sr)
    intervals = librosa.effects.split(y, top_db=top_db)
    non_silent_audio = np.concatenate([y[start:end] for start, end in intervals])
    return non_silent_audio

def load_and_preprocess(audio_path, sr=16000, top_db=30):
    y_trimmed = rm_silence(audio_path, sr=sr, top_db=top_db)
    return y_trimmed, sr