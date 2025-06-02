import os
import sounddevice as sd
import soundfile as sf

def record_audio(filename, duration=5, samplerate=16000):
    print(f"Recording for {duration} seconds...")
    recording = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=1, dtype='int16')
    sd.wait()
    sf.write(filename, recording, samplerate)
    print(f"Saved: {filename}")

def main():
    name = input("Enter your name: ").strip()
    folder = name.replace(" ", "_")
    os.makedirs(folder, exist_ok=True)
    input("Press Enter to start recording session...")
    count = 1
    while True:
        filename = os.path.join(folder, f"{count}.wav")
        record_audio(filename)

        user_input = input("Type 'm' for more or 'f' to finish: ").strip().lower()
        while user_input not in ['m', 'f']:
            user_input = input("Invalid input. Type 'm' for more or 'f' to finish: ").strip().lower()

        if user_input == 'f':
            print("Recording session finished.")
            break
        else:
            count += 1

if __name__ == "__main__":
    main()
