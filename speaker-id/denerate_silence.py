from pydub import AudioSegment
import os

def generate_silence_flac(num_files=40, duration=5000):
    output_dir = "silence_files"
    os.makedirs(output_dir, exist_ok=True)
    silence = AudioSegment.silent(duration=duration)
    for i in range(num_files):
        output_file = os.path.join(output_dir, f"silence_part{i+1}.flac")
        silence.export(output_file, format="flac")
        print(f"Saved silent file: {output_file}")

if __name__ == "__main__":
    try:
        generate_silence_flac()
        print("Successfully generated 40 silent FLAC files!")
    except Exception as e:
        print(f"An error occurred: {str(e)}")