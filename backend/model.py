import keras
import json
from sklearn.preprocessing import LabelEncoder
import numpy as np
import os
def load_model():
    """
    Load the pre-trained Keras model for speaker identification.
    Returns:
    - model: The loaded Keras model.
    """
    model_path = os.path.join(os.path.dirname(__file__), 'model.keras')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    return keras.models.load_model(model_path)
def load_label_encoder():
    """
    Load the label encoder for speaker identification fron json file.
    
    Returns:
    - label_encoder: The loaded label encoder.
    """
    filename = os.path.join(os.path.dirname(__file__), 'label_encoder.json')
    with open(filename, 'r') as f:
        data = json.load(f)
    label_encoder = LabelEncoder()
    label_encoder.classes_ = np.array(data)
    print('label_encoder shape:',label_encoder.classes_.shape)
    return label_encoder
