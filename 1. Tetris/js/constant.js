'use strict';

export const ROWS = 20;
export const COLS = 10;

export const SCREEN_ROWS = ROWS + 1;
export const SCREEN_COLS = COLS + 6;

export const BLOCK_SIZE = 30;
export const BLOCK_BOARDER_COLOR = 'WHITE';

export const BLOCK_COUNT = 3;

export const WIDTH  = SCREEN_COLS * BLOCK_SIZE;
export const HEIGHT = SCREEN_ROWS * BLOCK_SIZE;

export const INNER_BLOCK_SIZE = 0.03;

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
            [2, 2],
            [2, 2],
        ],
    },
    {
        name: 'T',
        color: 'purple',
        shape: [
            [3, 3, 3],
            [0, 3, 0],
            [0, 0, 0],
        ],
    },
    {
        name: 'S',
        color: 'green',
        shape: [
            [0, 4, 4],
            [4, 4, 0],
            [0, 0, 0],
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
            [0, 0, 0],
            [6, 6, 0],
            [0, 6, 6],
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