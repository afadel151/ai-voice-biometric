from keras.api import models,layers,Sequential
from keras.api.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization

INPUT_SHAPE = (20, 200, 1) 
NUM_CLASSES = 40
def create_model(input_shape=INPUT_SHAPE, num_classes=NUM_CLASSES):
    """
    Create a CNN model for speaker recognition.
    
    Parameters:
    - input_shape: tuple, shape of the input data (height, width, channels)
    - num_classes: int, number of output classes
    
    Returns:
    - model: Keras Sequential model
    """
    
    # Define the CNN model
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        BatchNormalization(),
        MaxPooling2D((2, 2)),
        Dropout(0.3),

        Conv2D(64, (3, 3), activation='relu'),
        BatchNormalization(),
        MaxPooling2D((2, 2)),
        Dropout(0.3),

        Conv2D(128, (3, 3), activation='relu'),
        BatchNormalization(),
        MaxPooling2D((2, 2)),
        Dropout(0.4),

        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.4),
        Dense(num_classes, activation='softmax')  # nombre de classes
    ])
    return model