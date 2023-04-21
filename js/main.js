import {
    ROWS, COLS, BLOCK_SIZE, WIDTH, HEIGHT, SHAPES, KEYS
} from './constant.js';

import Board from './board.js';
import Piece from './piece.js';

function App() {
    const that = this;
    this.canvas = document.querySelector('#app');
    this.startBtn = document.querySelector('#start');
    this.context = this.canvas.getContext('2d');

    this.context.canvas.width = WIDTH;
    this.context.canvas.height = HEIGHT;

    this.context.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.time = {start: 0, elapsed: 0, level: 500};

    this.board = new Board(this.context);
    this.piece = new Piece(this.context);

    const event = this.startBtn.addEventListener('click', this.start.bind(this));
    
}

App.prototype.start = function() {
    document.addEventListener('keydown', (e) => {
        if(e.keyCode === KEYS.SPACE) {
            let piece;
            while(this.board.validation(piece = this.moves[KEYS.DOWN].call(this, this.piece))) {
                this.piece.move.call(this.piece, piece);
                this.drawScreen.call(this);
            }
        }

        else if(this.moves[e.keyCode]) {
            const piece = this.moves[e.keyCode].call(this, this.piece);
            if(this.board.validation.call(this.board, piece)) {
                this.piece.move.call(this.piece, piece);
            }
            this.drawScreen.call(this);
        }
    });
    requestAnimationFrame(this.animate.bind(this));
}

App.prototype.moves = {
    [KEYS.RIGHT]: e => ({...e, x: e.x + 1}),
    [KEYS.LEFT]: e => ({...e, x: e.x - 1}),
    [KEYS.DOWN]: e => ({...e, y: e.y + 1}),
    [KEYS.UP]: function(e){
        return this.piece.rotateShape.call(this, {...e});
    },
}

App.prototype.animate = function(now = 0) {
    const time = this.time;
    time.elapsed = now - time.start;
    if(time.elapsed >= time.level) {
        time.start = now;
        this.drop.call(this);
    }
    requestAnimationFrame(this.animate.bind(this));
}

App.prototype.drop = function() {
    const piece = this.moves[KEYS.DOWN].call(this, this.piece);
    if(this.board.validation(piece)) {
        this.piece.move.call(this.piece, piece);
    }
    else {
        this.board.writeBoard.call(this.board, this.piece);
        this.piece = new Piece(this.context);
        this.board.removeLine.call(this.board);
    }
    this.drawScreen.call(this);
}

App.prototype.drawScreen = function() {
    this.board.clear.call(this.board);
    this.board.draw.call(this.board);
    this.piece.draw.call(this.piece);
}

window.onload = function() {
    new App();
}