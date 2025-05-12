import librosa
import numpy as np
import matplotlib.pyplot as plt

# Load both audio files with their original sample rates
y1, sr1 = librosa.load("audio1.wav", sr=None)
y2, sr2 = librosa.load("audio2.wav", sr=None)

# Time axes for each signal
t1 = np.linspace(0, len(y1) / sr1, num=len(y1))
t2 = np.linspace(0, len(y2) / sr2, num=len(y2))

# Create the plot
plt.figure(figsize=(12, 6))

# Plot the first waveform in red
plt.plot(t1, y1, color='red', label='audio1.wav')

# Plot the second waveform in blue
plt.plot(t2, y2, color='blue', label='audio2.wav')

# Add labels and legend
plt.xlabel("Time (seconds)")
plt.ylabel("Amplitude")
plt.title("Waveforms of audio1.wav and audio2.wav")
plt.legend()

# Layout adjustment and show
plt.tight_layout()
plt.show()
