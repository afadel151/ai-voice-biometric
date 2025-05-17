import librosa
import numpy as np
import soundfile as sf


def rm_silence(input_file, sr, top_db=30):
    y, sr = librosa.load(input_file, sr=sr)
    intervals = librosa.effects.split(y, top_db=top_db)
    non_silent_audio = np.concatenate([y[start:end] for start, end in intervals])
    return non_silent_audio

    
input_file = "test2.wav"
rm_silence(input_file, 16000) # best performant


