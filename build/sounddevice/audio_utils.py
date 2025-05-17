import librosa
import numpy as np
import soundfile as sf


def rm_silence(input_file, output_file,sr,top_db=10):
    y, sr = librosa.load(input_file, sr=16000)
    intervals = librosa.effects.split(y, top_db=10)
    non_silent_audio = np.concatenate([y[start:end] for start, end in intervals])
    sf.write(output_file, non_silent_audio, sr)
    print(f"Saved only voice parts to '{output_file}'")