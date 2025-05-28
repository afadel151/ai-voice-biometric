import numpy as np


def resize_data(S_resized):
    X = np.expand_dims(S_resized, axis=-1) / 255.0
    return X

