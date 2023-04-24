import {
<<<<<<< HEAD
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
=======
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
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
 */
Board.prototype.draw = function() {
    const that = this;
    this.board.forEach((e, dy) => {
        e.forEach((value, dx) => {
            if(value) { // value > 0
<<<<<<< HEAD
                that.context.fillStyle = SHAPES[value-1].color;
                that.context.fillRect(dx, dy, 1, 1);
=======
                this.context.fillStyle = 'white';
                this.context.fillRect(dx, dy, 1, 1);
                that.context.fillStyle = SHAPES[value-1].color;
                this.context.fillRect(
                    dx + INNER_BLOCK_SIZE, 
                    dy + INNER_BLOCK_SIZE, 
                    1 - INNER_BLOCK_SIZE * 2, 
                    1 - INNER_BLOCK_SIZE * 2
                );
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
            }
        });
    });
}

<<<<<<< HEAD
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

=======
/**
 * 블록이 바닥에 닿거나 다른 블록에 닿으면 board 배열에 입력시킨다.  
 */
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
Board.prototype.writeBoard = function(piece) {
    const that = this;
    piece.shapeInfo.shape.forEach((e, dy) => {
        e.forEach((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
<<<<<<< HEAD
            
            if(value) that.board[y][x] = value;
        });
    });
=======
            value && (that.board[y][x] = value);
        });
    });    
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
}

Board.prototype.removeLine = function() {
    const that = this;
    this.board.forEach((e, dy) => {
        const result = e.every((value, dx) => value > 0);
        if(result) {
            that.board.splice(dy, 1);
            that.board.unshift(Array(COLS).fill(0));
<<<<<<< HEAD
            let number = document.querySelector('#score--num');
=======
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
        }
    })
}

<<<<<<< HEAD
Board.prototype.clear = function() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    this.context.drawImage(this.background, 0, 0, COLS, ROWS);
=======
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
>>>>>>> ffbc285af2c494df631ff2cec69df039961bb41c
}