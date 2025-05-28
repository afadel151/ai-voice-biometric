from keras.api.models import Sequential
from keras.api.layers import (Conv2D, MaxPooling2D, Flatten, Dense,
                                     BatchNormalization, Dropout, InputLayer)

def create_model(num_classes):
    model = Sequential([
        InputLayer(input_shape=(369, 496, 1)),

        Conv2D(32, (3, 3), activation='relu', padding='same'),
        BatchNormalization(),
        MaxPooling2D((3, 3)),

        Conv2D(32, (3, 3), activation='relu', padding='same'),
        BatchNormalization(),
        MaxPooling2D((3, 3)),

        Conv2D(32, (3, 3), activation='relu', padding='same'),
        BatchNormalization(),
        MaxPooling2D((3, 3)),

        Conv2D(32, (3, 3), activation='relu', padding='same'),
        BatchNormalization(),
        MaxPooling2D((3, 3)),

        Flatten(),

        Dense(128, activation='relu'),
        Dropout(0.3),

        Dense(100, activation='relu'),
        Dropout(0.3),

        Dense(num_classes, activation='softmax')
    ])
    return model
