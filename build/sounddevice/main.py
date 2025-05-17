from process import process_audio
from mfcc_extraction import extract_mfcc
from show_sr import show_sr
if __name__ == "__main__":
    input_file = "output.flac"
    output_file = "cleaned_output.flac"
    duration = 5  
    samplerate = 16000
    channels = 1

    name = input("Please enter your name: ")
    if name:
        input_file = f"{name}.flac"
        output_file = f"{name}_cleaned.flac"
    else:
        print("No name provided, using default file names.")
    process_audio(input_file, output_file, duration, samplerate, channels)
    
    extract_mfcc(output_file, name+".csv", sr=samplerate)
    show_sr(output_file)
    
    