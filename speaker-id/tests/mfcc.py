from src.mfcc import mfcc 
import librosa 


y,sr = librosa.load("tests/test.flac", sr=16000)
mfcc_features = mfcc(signal=y, sample_rate=sr)
print("manual MFCC features :", mfcc_features) 
print("librosa MFCC features :", librosa.feature.mfcc(y=y, sr=sr))