import librosa
import numpy as np


def rm_silence(y, sr, top_db=30):
    intervals = librosa.effects.split(y, top_db=top_db)
    non_silent = np.concatenate([y[start:end] for start, end in intervals])
    return non_silent

def extract_mfcc(audio_path, sr, n_mfcc=40,n_frames=100):
    y,sr = librosa.load(audio_path,sr=sr)
    y = rm_silence(y, sr)
    mfcc = librosa.feature.mfcc(y=y,sr=sr, n_mfcc=n_mfcc)
    if mfcc.shape[1] < n_frames:
        pad_width = n_frames - mfcc.shape[1]
        mfcc = np.pad(mfcc, ((0, 0), (0, pad_width)), mode='constant')
    else:
        mfcc = mfcc[:, :n_frames]
    return mfcc
if __name__ == "__main__":
    # Example usage
    mfcc = extract_mfcc("temp_audio.wav", sr=16000, n_mfcc=40, n_frames=100)
    print("MFCC shape:", mfcc.shape)
    print("MFCC features:", mfcc)