import * as common from './common.js';
import {
    SCREEN_ROWS,
    SCREEN_COLS,
    ROWS, 
    COLS, 
    WIDTH,
    HEIGHT,
    SHAPES,
} from './constant.js';

export default function Board(app) {
    this.context = app.context;
    
    this.initBoard();
    this.initBackground();
}

/**
 * 테트리스의 그리드를 초기화해준다.
 */
Board.prototype.initBackground = function() {
      
    for(let i = 0; i <  SCREEN_ROWS; i++) {
        for(let j = 0; j < SCREEN_COLS; j++) {
            this.context.fillStyle = 'white';
            this.context.fillRect(j, i, 1, 1);
            if(j === COLS || j === SCREEN_COLS - 1 || i === 0 || i === SCREEN_ROWS - 1) {
                this.context.fillStyle = '#000000';
            }
            else {
                this.context.fillStyle = '#CCCCCC';
            }
            common.drawInnerBlock.call(this, j, i);
        }
    }
}

/**
 * 테트리스의 백그라운드를 초기화해준다. (GameOver시 호출)
 */
Board.prototype.initBoard = function() {
    this.board = Array.from({length: ROWS}, ele => Array(COLS).fill(0));
}

/**
 * 벽이나 다른 블럭에 닿았을 경우를 체크해준다.
 */
Board.prototype.vailDation = function(piece) {
    return piece.shapeInfo.shape.every((e, dy) => {
        return e.every((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            // piece의 value가 0일경우 어디든 움직여도 상관이 없기 때문에 논리연산자를 이용해 true로 바꾸고 리턴
            // piece의 value가 0이 아닐 경우 계산된 좌표의 숫자가 0일경우 true 리턴
            // board의 y좌표가 undefined거나 x좌표가 undefined거나 쌓여있는 블록(1이상)이 있는 경우 false
            return !value || this.board[y] && this.board[y][x] === 0;
        });
    });
}

/**
 * board 배열에 입력된 값을 canvas에 출력시킨다.
 */
Board.prototype.draw = function() {
    this.board.forEach((e, dy) => {
        e.forEach((value, dx) => {
            if(value) { // value > 0
                this.context.fillStyle = 'white';
                this.context.fillRect(dx, dy, 1, 1);
                this.context.fillStyle = SHAPES[value-1].color;
                common.drawInnerBlock.call(this, dx, dy);
            }
        });
    });
}

/**
 * 블록이 바닥에 닿거나 다른 블록에 닿으면 board 배열에 입력시킨다.  
 */
Board.prototype.writeBoard = function(piece) {
    piece.shapeInfo.shape.forEach((e, dy) => {
        e.forEach((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            value && (this.board[y][x] = value);
        });
    });    
}

/**
 * 한줄이 완성된 row는 백그라운드에서 제거시켜준다.
 */
Board.prototype.removeLine = function() {
    this.board.forEach((e, dy) => {
        const result = e.every((value, dx) => value > 0); // 컬럼이 모두 0보다 크게되면
        if(result) {
            this.board.splice(dy, 1);
            this.board.unshift(Array(COLS).fill(0));
        }
    })
}

/**
 * 블록이 처음 생성되었을 때 이미 쌓여있는 블록과 겹쳐졌는지를 검사 (게임오버)
 * return true: 겹쳐졌다 / return false: 안겹쳐졌다
 * @param {} piece 
 * @returns 
 */
Board.prototype.checkfline = function(piece) {
    return piece.shapeInfo.shape.every((e, dy) => {
        return e.every((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;
            // this.board[y][x]에서 0이나오면 겹치는게 아니더라도 false로 리턴해버리기 때문에 true로 바꿔줌
            return piece.y == 0 && this.board[y] && !this.board[y][x];
        });
    });
}

/**
 * 그리드를 초기화하고 배경을 다시 그려준다.
 */
Board.prototype.clear = function() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    this.initBackground();
}