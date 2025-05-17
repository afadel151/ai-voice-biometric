from keras import layers, models
model = models.load_model('tdnn_speaker_model.h5')

embedding_model = models.Model(inputs=model.input, outputs=model.layers[-2].output)
speaker_embeddings = {}
for speaker in labels:
    speaker_path = os.path.join('dataset', speaker)
    embeddings = []
    for file in os.listdir(speaker_path):
        if file.endswith('.wav'):
            file_path = os.path.join(speaker_path, file)
            y_audio, sr = load_and_preprocess(file_path)
            mfcc = extract_mfcc(y_audio, sr)
            mfcc_padded = pad_sequences([mfcc], maxlen=input_shape[0], padding='post', dtype='float32')
            embedding = embedding_model.predict(mfcc_padded)[0]
            embeddings.append(embedding)
    speaker_embeddings[speaker] = np.mean(embeddings, axis=0)
