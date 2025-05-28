import librosa
import numpy as np
import matplotlib.pyplot as plt
import cv2  


def get_spectogram(audio_path):
    y, sr = librosa.load(audio_path,sr=16000)
    S = np.abs(librosa.stft(y, n_fft=1024, hop_length=512))
    S_db = librosa.amplitude_to_db(S, ref=np.max)

    S_norm = (S_db - S_db.min()) / (S_db.max() - S_db.min())
    S_img = (S_norm * 255).astype(np.uint8)
    target_size = (496, 369) 
    S_resized = cv2.resize(S_img, target_size, interpolation=cv2.INTER_AREA)
    return S_resized