from src.cnn.model import create_model as build_cnn_model
from dataset import prepare_dataset
from keras.api.preprocessing.sequence import pad_sequences
from keras.api.metrics import Precision, Recall
from keras.api.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from sklearn.utils import class_weight
import numpy as np
from keras.api.callbacks import ReduceLROnPlateau, EarlyStopping
from collections import Counter
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

DATASET_DIR = "data"
X,y = prepare_dataset(path=DATASET_DIR,n_mfccs=13, n_frames=100)

X = np.array(X)[..., np.newaxis]

le = LabelEncoder()
y_encoded = le.fit_transform(y)
y_cat = to_categorical(y_encoded)

print("Class distribution:", Counter(y))
print("Number of samples:", len(X))
print("LabelEncoder classes:", le.classes_)

X_train, X_val, y_train, y_val = train_test_split(X, y_cat, test_size=0.2, stratify=y_encoded, random_state=42)
X_mean = np.mean(X_train, axis=0)
X_std = np.std(X_train, axis=0) + 1e-9
X_train = (X_train - X_mean) / X_std
X_val = (X_val - X_mean) / X_std


input_shape = X_train.shape
num_classes = y_cat.shape[1]


model = build_cnn_model((input_shape[1], input_shape[2], 1), num_classes)

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy', Precision(), Recall()])
class_weights = class_weight.compute_class_weight('balanced', classes=np.unique(y_encoded), y=y_encoded)
class_weights_dict = dict(enumerate(class_weights))
lr_scheduler = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, min_lr=1e-6)
early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=20,
    batch_size=32,
    class_weight=class_weights_dict,
    callbacks=[lr_scheduler, early_stopping]
)


y_pred = model.predict(X_val)
y_pred_classes = np.argmax(y_pred, axis=1)
y_val_classes = np.argmax(y_val, axis=1)
print(classification_report(y_val_classes, y_pred_classes, target_names=le.classes_))
model.save('cnn_speaker_model.keras')