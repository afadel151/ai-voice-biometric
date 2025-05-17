import sounddevice as sd
import soundfile as sf

def record_flac(filename, duration=5, samplerate=16000, channels=1):
    print("Recording...")
    audio = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=channels)
    sd.wait()
    print("Recording complete.")
    sf.write(filename, audio, samplerate)
    print(f"Saved to {filename}")
    return filename


