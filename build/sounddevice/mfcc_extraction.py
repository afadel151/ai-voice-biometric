import librosa
import numpy as np



def extract_mfcc(input_file, output_file, sr=16000, n_mfcc=13):
    y, sr = librosa.load(input_file, sr=sr)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    mfccs = mfccs.T  
    np.savetxt(output_file, mfccs, delimiter=",", header=",".join([f"c{i+1}" for i in range(mfccs.shape[1])]), comments="")
    print(f"MFCC features saved to '{output_file}'")
    

def extract_mfccs(y, sr, n_mfcc=40):
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    mfcc = mfcc.T 
    return mfcc
