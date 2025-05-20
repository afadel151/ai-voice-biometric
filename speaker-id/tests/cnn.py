from mfcc import mfcc
import librosa 


y,sr = librosa.load("nice-work.wav")
mfcc_features = mfcc(signal=y, sample_rate=sr)
