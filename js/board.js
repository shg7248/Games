import {
    ROWS, 
    COLS, 
    BLOCK_SIZE,
    WIDTH,
    HEIGHT,
    SHAPES,
    KEYS,
    INNER_BLOCK_SIZE,
} from './constant.js';

export default function Board(context) {

    this.board = Array.from({length: ROWS}, ele => Array(COLS).fill(0));
    this.context = context;

    this.initBackground();
}

Board.prototype.initBackground = function() {
    const that = this;
    // this.background = new Image();
    // this.background.src = './images/background.png';
    // this.background.onload = function() {
    //     that.context.drawImage(that.background, 0, 0, COLS, ROWS);
    // }
    this.board.forEach((e, dy) => {
        e.forEach((value, dx) => {
            that.context.fillStyle = 'white';
            that.context.fillRect(dx, dy, 1, 1);
            that.context.fillStyle = '#CCCCCC';
            this.context.fillRect(
                dx + INNER_BLOCK_SIZE, 
                dy + INNER_BLOCK_SIZE, 
                1 - INNER_BLOCK_SIZE * 2, 
                1 - INNER_BLOCK_SIZE * 2
            );
        });
    });
}

Board.prototype.vailDation = function(piece) {
    const that = this;
    return piece.shapeInfo.shape.every((e, dy) => {
        return e.every((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            return !value || that.board[y] && that.board[y][x] === 0;
        });
    });
}

/**
 * board 배열에 입력된 값을 canvas에 출력시킨다.
 */
Board.prototype.draw = function() {
    const that = this;
    this.board.forEach((e, dy) => {
        e.forEach((value, dx) => {
            if(value) { // value > 0
                this.context.fillStyle = 'white';
                this.context.fillRect(dx, dy, 1, 1);
                that.context.fillStyle = SHAPES[value-1].color;
                this.context.fillRect(
                    dx + INNER_BLOCK_SIZE, 
                    dy + INNER_BLOCK_SIZE, 
                    1 - INNER_BLOCK_SIZE * 2, 
                    1 - INNER_BLOCK_SIZE * 2
                );
            }
        });
    });
}

/**
 * 블록이 바닥에 닿거나 다른 블록에 닿으면 board 배열에 입력시킨다.  
 */
Board.prototype.writeBoard = function(piece) {
    const that = this;
    piece.shapeInfo.shape.forEach((e, dy) => {
        e.forEach((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            value && (that.board[y][x] = value);
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
        }
    })
}

Board.prototype.checkfline = function(piece) {
    const that = this;
    return piece.shapeInfo.shape.every((e, dy) => {
        return e.every((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            return !(piece.y == 0 && this.board[y] && this.board[y][x]);
        });
    });
}

Board.prototype.clear = function() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    this.initBackground();
}