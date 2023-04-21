import {
    ROWS, COLS, BLOCK_SIZE, WIDTH, HEIGHT, SHAPES, KEYS
} from './constant.js';

export default function Board(context) {
    this.board = Array.from({length: ROWS}, ele => Array(COLS).fill(0));
    this.context = context;
    
    this.drawBackground();
}

Board.prototype.drawBackground = function() {
;   const that = this;
    this.background = new Image();
    this.background.src = './img/background.png';
    this.background.onload = function() {
        that.context.drawImage(that.background, 0, 0, COLS, ROWS);
    }
}

/**
 * canvas에 board 변수가 담고있는 배열을 그린다.
 * value가 1 이상일 경우는 블록이 쌓여있는 것이므로 색을 칠한다.
 */
Board.prototype.draw = function() {
    const that = this;
    this.board.forEach((e, dy) => {
        e.forEach((value, dx) => {
            if(value) { // value > 0
                that.context.fillStyle = SHAPES[value-1].color;
                that.context.fillRect(dx, dy, 1, 1);
            }
        });
    });
}

Board.prototype.validation = function(piece) {
    const that = this;
    return piece.shapeInfo.shape.every((e, dy) => {
        return e.every((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            return value === 0 || that.board[y] && that.board[y][x] === 0;
        });
    });
}

Board.prototype.writeBoard = function(piece) {
    const that = this;
    piece.shapeInfo.shape.forEach((e, dy) => {
        e.forEach((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            
            if(value) that.board[y][x] = value;
        });
    });
}

Board.prototype.removeLine = function() {
    const that = this;
    this.board.forEach((e, dy) => {
        const result = e.every((value, dx) => value > 0);
        if(result) {
            that.board.splice(dy, 1);
            that.board.unshift(Array(COLS).fill(0));
            let number = document.querySelector('#score--num');
        }
    })
}

Board.prototype.clear = function() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    this.context.drawImage(this.background, 0, 0, COLS, ROWS);
}