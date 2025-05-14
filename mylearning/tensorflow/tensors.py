import tensorflow as tf
import numpy as np

# Generate dummy data
X = np.array([[i] for i in range(0, 11)], dtype=float)
y = np.array([[i**2] for i in range(0, 11)], dtype=float)

# Define a Sequential model
# This is a simple feedforward neural network with one hidden layer
# The input shape is (1,) because we have one feature (the number itself)
# The hidden layer has 10 neurons and uses ReLU activation function
# The output layer has 1 neuron (the predicted value)
model = tf.keras.Sequential([
    tf.keras.Input(shape=(1,)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1)
])

# Compile the model
# We use mean squared error as the loss function and Adam optimizer
# The learning rate is set to 0.001
# We can also use other optimizers like SGD, RMSprop, etc.
# Train the model
# We use 1000 epochs for training and set verbose to 0 to suppress output during training


model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), loss='mse')
model.fit(X, y, epochs=1000, verbose=0)


# Test it
print(
    model.predict(
        np.array([
            [6.0]
            ]
        )
    )
)  # Should be close to 36 (i.e., 6^2)
