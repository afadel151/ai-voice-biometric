import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

sr = 16000
n_fft = 2048 
n_mels = 128 

mel_filters = librosa.filters.mel(sr=sr, n_fft=n_fft, n_mels=n_mels)

plt.figure(figsize=(10, 6))
for i in range(n_mels):
    plt.plot(mel_filters[i])
plt.title('Mel Filterbank ({} filters, FFT size = {})'.format(n_mels, n_fft))
plt.xlabel('FFT bins')
plt.ylabel('Amplitude')
plt.grid(True)
plt.tight_layout()
plt.show()
    