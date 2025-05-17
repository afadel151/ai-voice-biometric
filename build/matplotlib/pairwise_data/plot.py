import matplotlib.pyplot as plt
import numpy as np

plt.style.use('_mpl-gallery')

# make data
x = np.linspace(0, 10, 100)
# 100 points de 0 a 10 
y = 4 + 1 * np.sin(2 * x)
x2 = np.linspace(0, 10, 25)
# 25 points de 0 a 10
y2 = 4 + 1 * np.sin(2 * x2)

# plot
fig, ax = plt.subplots()

ax.plot(x2, y2 + 2.5, 'x', markeredgewidth=2)
ax.plot(x, y,'x', linewidth=2.0)
ax.plot(x2, y2 - 2.5, 'o-', linewidth=2)

ax.set(xlim=(0, 10), xticks=np.arange(1, 11),
       ylim=(0, 8), yticks=np.arange(1, 8))

plt.show()