import scipy.io.wavfile
from scipy.fftpack import dct
import matplotlib.pyplot as plt
import numpy
# i want to show both plots when running 
# the code in the same time

sample_rate, signal = scipy.io.wavfile.read('OSR_us_000_0010_8k.wav')  # File assumed to be in the same directory
signal = signal[0:int(3.5 * sample_rate)]
plt.figure(figsize=(15, 5))
plt.plot(signal)
plt.title('Signal Wave...')
plt.xlabel('Sample')
plt.ylabel('Amplitude')

pre_emphasis = 0.97
emphasized_signal = numpy.append(signal[0], signal[1:] - pre_emphasis * signal[:-1])
# show the signal after pre-emphasis
plt.figure(figsize=(15, 5))
plt.plot(emphasized_signal)
plt.title('Signal Wave after pre-emphasis...')
plt.xlabel('Sample')
plt.ylabel('Amplitude')
plt.show()