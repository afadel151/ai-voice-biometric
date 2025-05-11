#NumPy arrays can be defined using Python sequences
#such as lists and tuples. Lists and tuples are defined using [...] and (...),
# respectively. Lists and tuples can define ndarray creation

import numpy as np
a1D = np.array([1, 2, 3, 4])
a2D = np.array([[1, 2], [3, 4]])
a3D = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print("1D array creation using array() : ", a1D)
print("2D array creation using array() : ", a2D)
print("3D array creation using array() : ", a3D)
