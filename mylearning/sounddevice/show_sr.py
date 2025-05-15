import librosa


def show_sr(input_file):
    y, sr = librosa.load(input_file, sr=None)
    sr2 = librosa.get_samplerate(input_file)
    print(f"Sample rate: {sr}")
    print(f"Audio duration: {librosa.get_duration(y=y, sr=sr)} seconds")
    print(f"Audio shape: {y.shape}")
    print(f"Audio type: {type(y)}")
    print(f"Audio dtype: {y.dtype}")
    print(f"Audio sample rate (get_samplerate): {sr2}")
    

