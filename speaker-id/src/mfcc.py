import numpy as np
from scipy.fftpack import dct
from scipy.fftpack import fft

import librosa 
librosa.feature.mfcc
TARGET_FRAMES = 300  
N_MFCC = 40          
SR = 16000 

MEL_FILTERS = 128
FRAME_LENGTH = 0.025
FRAME_STEP = 0.01
FFT_FILTERS = 2048

def mfcc(signal, sample_rate=SR, frame_length=FRAME_LENGTH, frame_step=FRAME_STEP, num_mfcc=N_MFCC, num_mel_filters=MEL_FILTERS, target_frames=TARGET_FRAMES):
    if not isinstance(signal, np.ndarray):
        raise ValueError("Input signal must be a 1D numpy array.")
    
    S = power_to_db(mel_spectogram(signal, sr=sample_rate, n_fft=int(sample_rate * frame_length), hop_length=int(sample_rate * frame_step), n_mels=num_mel_filters))
    M = dct(S, axis=-2, type=2, norm="ortho")[..., :num_mfcc, :]
    
    # Fixing the shape of M to (target_frames, num_mfcc)
    if M.shape[0] > target_frames:
        M = M[:target_frames, :]
    elif M.shape[0] < target_frames:
        pad_width = target_frames - mfcc.shape[0]
        M = np.pad(mfcc, ((0, pad_width), (0, 0)), mode='constant')
    return M
   
   

 
def compute_stft(y):
    if not isinstance(y, np.ndarray):
        raise ValueError("Input signal must be a 1D numpy array.")
    stft = np.fft.fft(y)
    return stft

def power_spectogram(stft):
    if not isinstance(stft, np.ndarray):
        raise ValueError("Input signal must be a 1D numpy array.")
    mag = np.abs(stft) ** 2
    return mag 



def mel(sr: float,n_fft:int,n_mels = 128,fmin = 0.0,norm= "slaney"):
    n_mels = int(n_mels)
    weights = np.zeros((n_mels, int(1 + n_fft // 2)), dtype=np.float32)
    fftfreqs = fft_frequencies(sr=sr, n_fft=n_fft)
    mel_f = mel_frequencies(n_mels + 2, fmin=fmin)
    fdiff = np.diff(mel_f)
    ramps = np.subtract.outer(mel_f, fftfreqs)
    for i in range(n_mels):
        # lower and upper slopes for all bins
        lower = -ramps[i] / fdiff[i]
        upper = ramps[i + 2] / fdiff[i + 1]

        # .. then intersect them with each other and zero
        weights[i] = np.maximum(0, np.minimum(lower, upper))
    if isinstance(norm, str):
        if norm == "slaney":
            # Slaney-style mel is scaled to be approx constant energy per channel
            enorm = 2.0 / (mel_f[2 : n_mels + 2] - mel_f[:n_mels])
            weights *= enorm[:, np.newaxis]
        else:
            raise print(f"Unsupported norm={norm}")
    else:
        weights = normalize(weights, norm=norm, axis=-1)
    # Only check weights if f_mel[0] is positive
    if not np.all((mel_f[:-2] == 0) | (weights.max(axis=1) > 0)):
        # This means we have an empty channel somewhere
        print("Empty filters detected in mel frequency basis. ")

    return weights
    
    
def fft_frequencies(*, sr = 22050, n_fft = 2048):
     return np.fft.rfftfreq(n=n_fft, d=1.0 / sr)


def mel_frequencies(n_mels = 128, *, fmin = 0.0, fmax = 11025.0, htk = False):
    min_mel = hz_to_mel(fmin, htk=htk)
    max_mel = hz_to_mel(fmax, htk=htk)
    mels = np.linspace(min_mel, max_mel, n_mels)

    hz: np.ndarray = mel_to_hz(mels)
    return hz

def hz_to_mel(frequencies, *, htk = False):
    
    frequencies = np.asanyarray(frequencies)
    if htk:
        mels: np.ndarray = 2595.0 * np.log10(1.0 + frequencies / 700.0)
        return mels
    f_min = 0.0
    f_sp = 200.0 / 3

    mels = (frequencies - f_min) / f_sp

    # Fill in the log-scale part

    min_log_hz = 1000.0  # beginning of log region (Hz)
    min_log_mel = (min_log_hz - f_min) / f_sp  # same (Mels)
    logstep = np.log(6.4) / 27.0  # step size for log region

    if frequencies.ndim:
        # If we have array data, vectorize
        log_t = frequencies >= min_log_hz
        mels[log_t] = min_log_mel + np.log(frequencies[log_t] / min_log_hz) / logstep
    elif frequencies >= min_log_hz:
        # If we have scalar data, heck directly
        mels = min_log_mel + np.log(frequencies / min_log_hz) / logstep

    return mels


def mel_to_hz(mels):
    mels = np.asanyarray(mels)
    f_min = 0.0
    f_sp = 200.0 / 3
    freqs = f_min + f_sp * mels

    # And now the nonlinear scale
    min_log_hz = 1000.0  # beginning of log region (Hz)
    min_log_mel = (min_log_hz - f_min) / f_sp  # same (Mels)
    logstep = np.log(6.4) / 27.0  # step size for log region

    if mels.ndim:
        # If we have vector data, vectorize
        log_t = mels >= min_log_mel
        freqs[log_t] = min_log_hz * np.exp(logstep * (mels[log_t] - min_log_mel))
    elif mels >= min_log_mel:
        # If we have scalar data, check directly
        freqs = min_log_hz * np.exp(logstep * (mels - min_log_mel))

    return freqs 

def normalize(S,norm= np.inf,axis= 0,threshold= None,fill= None):
    if threshold is None:
        threshold = tiny(S)

    elif threshold <= 0:
        raise print(f"threshold={threshold} must be strictly positive")

    if fill not in [None, False, True]:
        raise print(f"fill={fill} must be None or boolean")

    if not np.all(np.isfinite(S)):
        raise print("Input must be finite")

    # All norms only depend on magnitude, let's do that first
    mag = np.abs(S).astype(float)

    # For max/min norms, filling with 1 works
    fill_norm = 1

    if norm is None:
        return S

    elif norm == np.inf:
        length = np.max(mag, axis=axis, keepdims=True)

    elif norm == -np.inf:
        length = np.min(mag, axis=axis, keepdims=True)

    elif norm == 0:
        if fill is True:
            raise print("Cannot normalize with norm=0 and fill=True")

        length = np.sum(mag > 0, axis=axis, keepdims=True, dtype=mag.dtype)

    elif np.issubdtype(type(norm), np.number) and norm > 0:
        length = np.sum(mag**norm, axis=axis, keepdims=True) ** (1.0 / norm)

        if axis is None:
            fill_norm = mag.size ** (-1.0 / norm)
        else:
            fill_norm = mag.shape[axis] ** (-1.0 / norm)

    else:
        raise print(f"Unsupported norm: {repr(norm)}")

    # indices where norm is below the threshold
    small_idx = length < threshold

    Snorm = np.empty_like(S)
    if fill is None:
        # Leave small indices un-normalized
        length[small_idx] = 1.0
        Snorm[:] = S / length

    elif fill:
        # If we have a non-zero fill value, we locate those entries by
        # doing a nan-divide.
        # If S was finite, then length is finite (except for small positions)
        length[small_idx] = np.nan
        Snorm[:] = S / length
        Snorm[np.isnan(Snorm)] = fill_norm
    else:
        # Set small values to zero by doing an inf-divide.
        # This is safe (by IEEE-754) as long as S is finite.
        length[small_idx] = np.inf
        Snorm[:] = S / length

    return Snorm


def tiny(x):
    x = np.asarray(x)
    if np.issubdtype(x.dtype, np.floating) or np.issubdtype(x.dtype, np.complexfloating):
        dtype = x.dtype
    else:
        dtype = np.dtype(np.float32)
    return np.finfo(dtype).tiny


def mel_spectogram(y, sr=16000, n_fft=2048, hop_length=512, n_mels=128, fmin=0.0, fmax=None):
    if not isinstance(y, np.ndarray):
        raise ValueError("Input signal must be a 1D numpy array.")
    if fmax is None:
        fmax = sr / 2
    mel_basis = mel(sr=sr, n_fft=n_fft, n_mels=n_mels, fmin=fmin)
    stft = compute_stft(y)
    power_spectrogram = power_spectogram(stft)
    mel_spectrogram = np.dot(mel_basis, power_spectrogram)
    return mel_spectrogram

def power_to_db(mel_spectrogram, ref=np.max):
    if not isinstance(mel_spectrogram, np.ndarray):
        raise ValueError("Input signal must be a 1D numpy array.")
    mel_spectrogram = np.maximum(mel_spectrogram, 1e-10)
    return 10 * np.log10(mel_spectrogram) - ref(mel_spectrogram)


def db_to_power(mel_spectrogram):
    if not isinstance(mel_spectrogram, np.ndarray):
        raise ValueError("Input signal must be a 1D numpy array.")
    return 10 ** (mel_spectrogram / 10)