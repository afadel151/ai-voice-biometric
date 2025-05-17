import librosa
from remove_silence import rm_silence
import numpy as np

import pandas as pd
TARGET_FRAMES = 300  
N_MFCC = 40          
SR = 16000 

def extract_mfccs_fixed_length(y, sr, n_mfcc=N_MFCC, target_frames=TARGET_FRAMES):
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    mfcc = mfcc.T  
    if mfcc.shape[0] > target_frames:
        mfcc = mfcc[:target_frames, :]
    elif mfcc.shape[0] < target_frames:
        pad_width = target_frames - mfcc.shape[0]
        mfcc = np.pad(mfcc, ((0, pad_width), (0, 0)), mode='constant')
    return mfcc


input_file = "test2.wav"
y = rm_silence(input_file, SR)  

mfcc = extract_mfccs_fixed_length(y, SR)
print("MFCC shape:", mfcc.shape) 
print(mfcc)

df = pd.DataFrame(mfcc)
df.to_csv("mfcc.csv", index=False)