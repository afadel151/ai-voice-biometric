from keras import layers, models
def build_tdnn_model(input_shape, num_speakers):
    inputs = layers.Input(shape=input_shape)

    x = layers.Reshape((300, 40))(inputs)
    x = layers.Conv1D(512, 5, padding='same', activation='relu')(x)
    x = layers.Conv1D(512, 3, padding='same', activation='relu')(x)
    x = layers.Conv1D(512, 1, padding='same', activation='relu')(x)

    x = layers.GlobalAveragePooling1D()(x)
    

    embeddings = layers.Dense(512, activation='relu', name='speaker_embedding')(x)

    outputs = layers.Dense(num_speakers, activation='softmax')(embeddings)
    
    model = models.Model(inputs=inputs, outputs=outputs)
    return model
