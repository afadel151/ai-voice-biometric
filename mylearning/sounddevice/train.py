import os
import librosa
import numpy as np
import tensorflow as tf
import soundfile as sf
from pymongo import MongoClient
from sklearn.metrics.pairwise import cosine_similarity

from keras import layers, models

def build_tdnn_model(input_shape, num_speakers):
    inputs = tf.keras.Input(shape=input_shape)
    x = layers.Conv1D(512, kernel_size=5, strides=1, padding='same', activation='relu')(inputs)
    x = layers.Conv1D(512, kernel_size=3, strides=1, padding='same', activation='relu')(x)
    x = layers.Conv1D(512, kernel_size=1, strides=1, padding='same', activation='relu')(x)
    x = layers.GlobalAveragePooling1D()(x)
    x = layers.Dense(512, activation='relu')(x)
    outputs = layers.Dense(num_speakers, activation='softmax')(x)
    model = models.Model(inputs=inputs, outputs=outputs)
    return model
