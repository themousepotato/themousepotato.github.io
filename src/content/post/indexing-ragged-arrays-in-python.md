---
title: Indexing Ragged Arrays in Python
description: ""
publishDate: "02 June 2021"
permalink: /posts/indexing-ragged-arrays-in-python
tags: ["python", "software", "indexing", "data"]
---

This post is going to be a small attempt from my side to understand indexing ragged arrays and making that work with Python. Indexing a data structure is accessing its elements by making memory efficient. A ragged array or a jagged array is an array of arrays which the member arrays can be of different lengths. This is quite straightforward to implement when we think through Python. 

Let's try to write a simple custom `RaggedArray` class in Python which supports indexing.

```python
from itertools import chain

class RaggedArray:
    def __init__(self, array):
        self.array = array

    def append(self, val):
        self.array.append(val)

    def __getitem__(self, pos):
        if isinstance(pos, int):
            return list(chain.from_iterable(self.array))[pos]

        if isinstance(pos, tuple):
            i, j = pos
            return self.array[i][j]

def main():
    arr = RaggedArray([])
    arr.append([1, 1, 0])
    arr.append([1, 0])
    print(arr[2]) # 0
    print(arr[1, 0]) # 1

if __name__ == '__main__':
    main()
```

Here, we can access `arr[103847]` to get the sequential `103847` index, or `arr[287, 326]` to get element `326` of subarray `287`. We can do `arr[i, j]` in `O(1)` and `arr[k]` in `O(n*n)` time complexity. `chain.from_iterable` creates a flattened array from the non-rectangular 2D array.

Let's try to make this more efficient. We used Python lists in this example. Numpy is widely known for its multidimensional array object for holding homogeneously-typed numerical data and manipulating large numbers of values without writing inefficient python loops. Instead of creating copies, numpy uses views to access elements in `O(1)` time. However, a numpy array having arrays of different shapes is considered as a normal Python list and it's not possible to form a view out of it since the data are not contiguous in memory and operations are not vectorized. Awkward array module supports views for ragged arrays. Now, let's modify our `RaggedArray` class to use awkward arrays instead of Python lists.

```python
import awkward

class RaggedArray:
    def __init__(self, array):
        self.array = awkward.fromiter(array)

    def __getitem__(self, pos):
        if isinstance(pos, int):
            # i: single index into a flattened view

            i = pos
            farray = self.array.flatten().flatten().flatten()
            return farray[i]

        if isinstance(pos, tuple):
            # i: grid index
            # j: single index into a flattened grid

            if len(pos) == 2:
                i, j = pos
                fgrid = self.array[i].flatten().flatten()
                return fgrid[j]

            if len(pos) == 4:
                # i: grid index
                # x, y, z: indices in a single grid

                i, x, y, z = pos
                return self.array[i][x][y][z]
```

This `awkward` module lets us to create a ragged array from a list using `awkward.fromiter()` function. Here, we also extended the indexing to 4 dimensions. Since we are using `flatten()` operation, it can access the elements in `O(1)` time.

This code is still inefficient since we're using integers for indexing. We can use boolean arrays for more efficiency. Let's try to write a simple `Bitset` class in Python which can support `AND`, `OR` operations, takes a set of integers and prints the boolean values on call.

```python
class Bitset:
    def __init__(self, arr):
        self.arr = arr
        self.bitset = None
        self._makebitset()

    def __and__(bitset1, bitset2):
        arr = bitset1.arr & bitset2.arr

        return Bitset(arr)

    def __or__(bitset1, bitset2):
        arr = bitset1.arr | bitset2.arr

        return Bitset(arr)

    def __str__(self):
        return ''.join(map(str, self.bitset))

    def _makebitset(self):
        bitset = [0]*(max(self.arr)+1)
        for n in self.arr:
            bitset[n] = 1
 
        self.bitset = bitset

    def add(self, n):
        self.arr.add(n)
        self._makebitset()

def main():
    print('{2, 5, 7}')
    a = Bitset({2, 5, 7})
    print(a) # 00100101
    print('add 3')
    a.add(3)
    print(a) # 00110101
    print('{2, 3, 5, 7} AND {2, 6, 7, 8}')
    b = Bitset({2, 6, 7, 8})
    c = a & b
    print(c) # 00100001
    print('{2, 3, 5, 7} OR {2, 6, 7, 8}')
    d = a | b
    print(d) # 001101111

if __name__ == '__main__':
    main()
```

It internally uses a boolean list created from a set of integers. We can use this instead of integers as index. A more popular compressed index is Enhanced Word-Aligned Hybrid (EWAH) index. Its C++ implementation can be found [here](https://github.com/lemire/EWAHBoolArray). It is used by a lot of popular softwares including git, yt, etc. [yt](https://yt-project.org/) uses it as a Cython wrapper. It is available as a Cython package [here](https://github.com/yt-project/ewah_bool_utils).


## References
* https://en.wikipedia.org/wiki/Jagged_array
* https://scipy-cookbook.readthedocs.io/items/Indexing.html
* https://scipy-cookbook.readthedocs.io/items/ViewsVsCopies.html
* https://awkward-array.org/quickstart.html

