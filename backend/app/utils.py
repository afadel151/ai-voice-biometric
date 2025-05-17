import librosa
import numpy as np
from scipy.ndimage import uniform_filter1d

def rm_silence(y, sr, top_db=30):
    intervals = librosa.effects.split(y, top_db=top_db)
    non_silent = np.concatenate([y[start:end] for start, end in intervals])
    return non_silent

def extract_mfcc(y, sr, n_mfcc=40):
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    return mfcc.T  # Shape: (T, 40)
