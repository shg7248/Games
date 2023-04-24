import {
<<<<<<< HEAD
    ROWS, COLS, BLOCK_SIZE, WIDTH, HEIGHT, SHAPES, KEYS
=======
    ROWS, 
    COLS, 
    BLOCK_SIZE,
    WIDTH,
    HEIGHT,
    SHAPES,
    KEYS,
    INNER_BLOCK_SIZE,
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
} from './constant.js';

export default function Piece(context) {
    this.x = 3;
    this.y = 0;
    this.shapeInfo = SHAPES[Math.floor((Math.random() * SHAPES.length))];
    this.length = this.shapeInfo.shape.length;
    this.context = context;
}

Piece.prototype.draw = function() {
<<<<<<< HEAD
    this.context.fillStyle = this.shapeInfo.color;
    this.shapeInfo.shape.forEach((e, i) => {
        e.forEach((value, j) => {
            if(value) { // value > 0
                const y = this.y + i;
                const x = this.x + j;
                this.context.fillRect(x, y, 1, 1);
=======
    this.shapeInfo.shape.forEach((e, dy) => {
        e.forEach((value, dx) => {
            if(value) { // value > 0
                const y = this.y + dy;
                const x = this.x + dx;

                this.context.fillStyle = 'white';
                this.context.fillRect(x, y, 1, 1);
                this.context.fillStyle = this.shapeInfo.color;
                this.context.fillRect(
                    x + INNER_BLOCK_SIZE, 
                    y + INNER_BLOCK_SIZE, 
                    1 - INNER_BLOCK_SIZE * 2, 
                    1 - INNER_BLOCK_SIZE * 2
                );
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
            }
        });
    });
}

<<<<<<< HEAD
Piece.prototype.move = function(e) {
    this.x = e.x;
    this.y = e.y;
    this.shapeInfo.shape = e.shapeInfo.shape;
}

Piece.prototype.rotateShape = function(e) {
    const arr = e.shapeInfo.shape;
    const size = arr.length - 1;
    return {...e, shapeInfo: {...e.shapeInfo, shape: arr.map((e, i) => {
        return e.map((value, j) => {
            return arr[size - j][i];
        });
    })}};
=======
Piece.prototype.rotateShape = function(e) {
    const arr = e.shapeInfo.shape;
    const size = arr.length - 1;
    return {...e, shapeInfo: {...e.shapeInfo, shape: arr.map((e, dy) => {
        return e.map((value, dx) => {
            return arr[size - dx][dy];
        });
    })}};
}

Piece.prototype.moveBlock = function(piece) {
    this.x = piece.x;
    this.y = piece.y;
    this.shapeInfo.shape = piece.shapeInfo.shape;
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
}