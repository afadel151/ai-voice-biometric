import numpy as np
from database import get_name
import json
from sklearn.preprocessing import LabelEncoder
import os
def identify_speaker(mfcc_features,model, threshold=0.75):
    """
    Identify the speaker based on MFCC features using cosine similarity.
    
    Parameters:
    - mfcc_features: A 2D numpy array of MFCC features for the audio segment (40,100).
    - threshold: Similarity threshold to determine if a speaker is identified.
    
    Returns:
    - speaker_name: The name of the identified speaker or 'unknown' if not identified.
    - probability: The probability of the identified speaker.
    """
    # identify the speaker id using the cnn model , label encoder and get his name from database
    mfcc_features = mfcc_features.reshape(1, 40, 100, 1)# Reshape for CNN input
    print("MFCC features shape:", mfcc_features.shape)
    predictions = model.predict(mfcc_features)
    probabilities = predictions[0]
    max_index = np.argmax(probabilities)
    print("Probabilities:", probabilities)
    print("Max index:", max_index)
    filename = os.path.join(os.path.dirname(__file__), 'label_encoder.json')
    with open(filename, 'r') as f:
        data = json.load(f)
    label_encoder = LabelEncoder()
    label_encoder.classes_ = np.array(data)
    print('label_encoder shape:',label_encoder.classes_.shape)
    max_probability = probabilities[max_index]
    if max_probability >= threshold:
        speaker_id = label_encoder.inverse_transform(np.array([max_index]))[0]
        print("Speaker ID:", speaker_id, "Probability:", max_probability)
        # speaker_name = get_name(speaker_id)
        # return speaker_name, max_probability
    else:
        return 'unknown', max_probability
    