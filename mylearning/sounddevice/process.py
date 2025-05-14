from record_audio import record_flac
from audio_utils import rm_silence
import os



def process_audio(input_file, output_file, duration=5, samplerate=16000, channels=1):
    if not os.path.exists(input_file):
        print(f"Input file '{input_file}' does not exist. Recording new audio.")
        input_file = record_flac(input_file, duration, samplerate, channels)
        rm_silence(input_file, output_file, samplerate)