from keras.api import models,layers

INPUT_SHAPE = (40, 300, 1) 
NUM_CLASSES = 250
def create_model(num_classes,input_shape=INPUT_SHAPE):
    model = models.Sequential([
        layers.Input(shape=input_shape),
        
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        
        
        layers.Conv2D(128, (3,3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        
        layers.Conv2D(128, (3,3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.3),
        
        layers.GlobalAveragePooling2D(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        
        
        layers.Dense(num_classes, activation='softmax')
    ])
    return model