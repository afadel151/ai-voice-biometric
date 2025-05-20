from src.cnn.model import build_cnn_model
from src.cnn.dataset import prepare_dataset
from keras.api.preprocessing.sequence import pad_sequences

from keras.api.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
import os
import numpy as np


DATASET_DIR = "data"
X,y = prepare_dataset(path=DATASET_DIR)
le = LabelEncoder()
y_encoded = le.fit_transform(y)
y_cat = to_categorical(y_encoded)
X_padded = pad_sequences(X, padding='post', dtype='float32')
