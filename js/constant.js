'use strict';

export const ROWS = 20;
export const COLS = 10;
export const BLOCK_SIZE = 30;

export const WIDTH = COLS * BLOCK_SIZE;
export const HEIGHT = ROWS * BLOCK_SIZE;

<<<<<<< HEAD
=======
export const INNER_BLOCK_SIZE = 0.03;

>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
export const SHAPES = [
    {
        name: 'I',
        color: 'cyan',
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
    },
    {
        name: 'O',
        color: 'yellow',
        shape: [
<<<<<<< HEAD
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
=======
            [2, 2],
            [2, 2],
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
        ],
    },
    {
        name: 'T',
        color: 'purple',
        shape: [
<<<<<<< HEAD
            [0, 3, 0],
            [3, 3, 3],
=======
            [3, 3, 3],
            [0, 3, 0],
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
            [0, 0, 0],
        ],
    },
    {
        name: 'S',
        color: 'green',
        shape: [
<<<<<<< HEAD
            [0, 0, 0, 0],
            [0, 0, 4, 4],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
=======
            [0, 4, 4],
            [4, 4, 0],
            [0, 0, 0],
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
        ],
    },
    {
        name: 'J',
        color: 'blue',
        shape: [
            [5, 0, 0],
            [5, 5, 5],
            [0, 0, 0],
        ],
    },
    {
        name: 'Z',
        color: 'red',
        shape: [
<<<<<<< HEAD
            [0, 0, 0, 0],
            [0, 6, 6, 0],
            [0, 0, 6, 6],
            [0, 0, 0, 0],
=======
            [0, 0, 0],
            [6, 6, 0],
            [0, 6, 6],

>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
        ],
    },
    {
        name: 'L',
        color: 'orange',
        shape: [
            [0, 0, 7],
            [7, 7, 7],
            [0, 0, 0],
        ],
    },
]

export const KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
}