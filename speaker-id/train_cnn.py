from src.cnn.model import create_model as build_cnn_model
from dataset import prepare_dataset
from keras.api.preprocessing.sequence import pad_sequences

from keras.api.utils import to_categorical
from sklearn.preprocessing import LabelEncoder


DATASET_DIR = "data"
X,y = prepare_dataset(path=DATASET_DIR)
le = LabelEncoder()
y_encoded = le.fit_transform(y)
y_cat = to_categorical(y_encoded)
X_padded = pad_sequences(X, padding='post', dtype='float32')

input_shape = X_padded.shape
num_classes = y_cat.shape



model = build_cnn_model((input_shape[1], input_shape[2], 1), num_classes[1])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_padded, y_cat, epochs=10, batch_size=32)

model.save('cnn_speaker_model.keras')