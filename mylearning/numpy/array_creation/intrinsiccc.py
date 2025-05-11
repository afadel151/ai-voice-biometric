# array creation routines : https://numpy.org/doc/stable/reference/routines.array-creation.html#routines-array-creation
# NumPy provides several functions to create arrays. The most basic one is the array() function, which can be used to create an array from a list or tuple.
# The array() function can also be used to create arrays from other arrays, and it can be used to create arrays with a specific data type.
# The following functions are used to create arrays:    
# 1. array() : Create an array from a list or tuple.
# 2. arange() : Create an array with a range of values.
# 3. linspace() : Create an array with a range of values, with a specified number of elements.
# 4. logspace() : Create an array with a range of values, with a specified number of elements, and with a logarithmic scale.
# 5. zeros() : Create an array filled with zeros.
# 6. ones() : Create an array filled with ones.
# 7. empty() : Create an empty array.
# 8. full() : Create an array filled with a specified value.
# 9. identity() : Create an identity matrix.
# 10. eye() : Create a 2-D array with ones on the diagonal and zeros elsewhere.
# 11. diag() : Create a diagonal array.
# 12. fromfunction() : Create an array from a function.
# 13. fromiter() : Create an array from an iterable.
# 14. fromstring() : Create an array from a string.
# 15. frombuffer() : Create an array from a buffer.
# 16. fromfile() : Create an array from a file.
# 17. fromarray() : Create an array from an array.
# 18. fromiter() : Create an array from an iterable.
# 19. fromstring() : Create an array from a string.
# 20. frombuffer() : Create an array from a buffer.
# 21. fromfile() : Create an array from a file.
# 22. fromarray() : Create an array from an array.
# 23. fromiter() : Create an array from an iterable.
# 24. fromstring() : Create an array from a string.
# 25. frombuffer() : Create an array from a buffer.

# 1D array creation functions
import numpy as np
# 1. array() : Create an array from a list or tuple.
a1D = np.array([1, 2, 3, 4])
print("1D array creation using array() : ", a1D)
# 2. arange() : Create an array with a range of values.
a1D = np.arange(2, 10, dtype=float)
print("1D array creation using arange() : ", a1D)
#numpy.linspace will create arrays with a specified number of elements, and spaced equally between the specified beginning and end values. For example:
a3D = np.linspace(1, 10, 5)
print("1D array creation using linspace() : ", a3D)

np.eye(3)
print("1D array creation using eye() : ", np.eye(3))