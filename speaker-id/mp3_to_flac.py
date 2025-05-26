from pydub import AudioSegment
import os
import math

def split_mp3_to_flac(input_file, segment_duration=5000):
    audio = AudioSegment.from_mp3(input_file)
    file_name = os.path.splitext(os.path.basename(input_file))[0]
    output_dir = f"{file_name}_segments"
    os.makedirs(output_dir, exist_ok=True)
    audio_length = len(audio)
    num_segments = math.ceil(audio_length / segment_duration)

    for i in range(num_segments):
        start_time = i * segment_duration
        end_time = min((i + 1) * segment_duration, audio_length)
        segment = audio[start_time:end_time]
        segment_file = os.path.join(output_dir, f"{file_name}_part{i+1}.flac")
        segment.export(segment_file, format="flac")
        print(f"Saved segment: {segment_file}")

if __name__ == "__main__":
    input_mp3 = "relax.mp3"
    if not os.path.exists(input_mp3):
        print(f"Error: The file '{input_mp3}' does not exist.")
    else:
        try:
            split_mp3_to_flac(input_mp3)
            print("Audio splitting completed successfully!")
        except Exception as e:
            print(f"An error occurred: {str(e)}")