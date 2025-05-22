from src.cnn.model import create_model as build_cnn_model
from dataset import prepare_dataset
from keras.api.preprocessing.sequence import pad_sequences
from keras.api.metrics import Precision, Recall
from keras.api.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from sklearn.utils import class_weight
import numpy as np

DATASET_DIR = "data"
X,y = prepare_dataset(path=DATASET_DIR)
X = [(x - np.mean(x)) / (np.std(x) + 1e-9) for x in X]
X_padded = np.array(X)[..., np.newaxis]
le = LabelEncoder()
y_encoded = le.fit_transform(y)
y_cat = to_categorical(y_encoded)

from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(X_padded, y_cat, test_size=0.2, stratify=y_encoded, random_state=42)



input_shape = X_padded.shape
num_classes = y_cat.shape[1]


model = build_cnn_model((input_shape[1], input_shape[2], 1), num_classes)

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy', Precision(), Recall()])
class_weights = class_weight.compute_class_weight('balanced', classes=np.unique(y_encoded), y=y_encoded)
class_weights_dict = dict(enumerate(class_weights))
model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=20,
    batch_size=32,
    class_weight=class_weights_dict
)

model.save('cnn_speaker_model.keras')