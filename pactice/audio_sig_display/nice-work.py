import librosa
import numpy as np
import matplotlib.pyplot as plt
import os
AUDIO_DIR = "audio"

def get_flac_files(directory):
    files = []
    for f in os.listdir(directory):
        if f.lower().endswith(".flac"):
            files.append(os.path.join(directory, f))
    return files

print("Audio files in the directory:", get_flac_files(AUDIO_DIR))