import {
} from './constant.js';

export default function Piece(context) {
    this.x = 3;
    this.y = 0;
    this.shapeInfo = SHAPES[Math.floor((Math.random() * SHAPES.length))];
    this.length = this.shapeInfo.shape.length;
    this.context = context;
}

Piece.prototype.draw = function() {
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
            }
        });
    });
}

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
}