from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from  keras.api.utils import to_categorical
from keras.api.preprocessing.sequence import pad_sequences
from train import build_tdnn_model
from process  import load_and_preprocess
from mfcc_extraction import extract_mfcc
import os
def prepare_dataset(dataset_path):
    X = []
    y = []
    labels = []
    for speaker in os.listdir(dataset_path):
        speaker_path = os.path.join(dataset_path, speaker)
        if os.path.isdir(speaker_path):
            labels.append(speaker)
            for file in os.listdir(speaker_path):
                if file.endswith('.wav'):
                    file_path = os.path.join(speaker_path, file)
                    y_audio, sr = load_and_preprocess(file_path)
                    mfcc = extract_mfcc(y_audio, sr)
                    X.append(mfcc)
                    y.append(speaker)
    return X, y, labels

X, y, labels = prepare_dataset('dataset')

le = LabelEncoder()
y_encoded = le.fit_transform(y)
y_categorical = to_categorical(y_encoded)


X_padded = pad_sequences(X, padding='post', dtype='float32')

input_shape = X_padded.shape[1:]  # (time_steps, n_mfcc)
num_speakers = len(set(y))
model = build_tdnn_model(input_shape, num_speakers)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(X_padded, y_categorical, epochs=10, batch_size=32)
model.save('tdnn_speaker_model.h5')
# model = tf.keras.models.load_model('tdnn_speaker_model.h5')
