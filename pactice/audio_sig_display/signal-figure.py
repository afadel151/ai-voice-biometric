import librosa
import numpy as np
import matplotlib.pyplot as plt

y1, sr1 = librosa.load("./Ouch-5.wav", sr=None)
y2, sr2 = librosa.load("./Ouch-5.wav")

t1 = np.linspace(0, len(y1) / sr1, num=len(y1))
t2 = np.linspace(0, len(y2) / sr2, num=len(y2))

plt.figure(figsize=(20, 6))
plt.plot(t1, y1, color='red', label='Ouch-5.wav')
plt.plot(t2, y2, color='blue', label='Ouch-6.wav')
plt.axhline(y=0, color='black', linestyle='--', linewidth=1)
plt.xlabel("Time (seconds)")
plt.ylabel("Amplitude")
plt.title("Waveforms of Ouch-5.wav and Ouch-6.wav (Original Sampling Rate)")
plt.legend()
plt.tight_layout()
plt.show()

y3, sr3 = librosa.load("./Ouch-5.wav", sr=44100)
y4, sr4 = librosa.load("./Ouch-6.wav", sr=44100)

t3 = np.linspace(0, len(y3) / sr3, num=len(y3))
t4 = np.linspace(0, len(y4) / sr4, num=len(y4))

plt.figure(figsize=(20, 6))
plt.plot(t3, y3, color='red', label='Ouch-5.wav')
plt.plot(t4, y4, color='blue', label='Ouch-6.wav')
plt.axhline(y=0, color='black', linestyle='--', linewidth=1)
plt.xlabel("Time (seconds)")
plt.ylabel("Amplitude")
plt.title("Waveforms of Ouch-5.wav and Ouch-6.wav (Resampled to 44100 Hz)")
plt.legend()
plt.tight_layout()
plt.show()