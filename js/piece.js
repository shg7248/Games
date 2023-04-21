import {
    ROWS, COLS, BLOCK_SIZE, WIDTH, HEIGHT, SHAPES, KEYS
} from './constant.js';

export default function Piece(context) {
    this.x = 3;
    this.y = 0;
    this.shapeInfo = SHAPES[Math.floor((Math.random() * SHAPES.length))];
    this.length = this.shapeInfo.shape.length;
    this.context = context;
}

Piece.prototype.draw = function() {
    this.context.fillStyle = this.shapeInfo.color;
    this.shapeInfo.shape.forEach((e, i) => {
        e.forEach((value, j) => {
            if(value) { // value > 0
                const y = this.y + i;
                const x = this.x + j;
                this.context.fillRect(x, y, 1, 1);
            }
        });
    });
}

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
}