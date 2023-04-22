'use strict';

import {
    ROWS, 
    COLS, 
    BLOCK_SIZE,
    WIDTH,
    HEIGHT,
    SHAPES,
    KEYS
} from './constant.js';

import Board from './board.js';
import Piece from './piece.js';

function App() {
    const that = this;
    
    this.canvas = document.querySelector('#app');
    this.context = this.canvas.getContext('2d');

    this.startBtn = document.querySelector('#start');

    this.context.canvas.width = WIDTH;
    this.context.canvas.height = HEIGHT;

    this.context.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.time = {start: 0, elapsed: 0, level: 500};

    this.board = new Board(this.context);
    this.piece = new Piece(this.context);

    this.startBtn.addEventListener('click', this.start.bind(this));
}

App.prototype.start = function() {
    this.addKeyListener();
    this.requestId = window.requestAnimationFrame(this.animate.bind(this))
}

App.prototype.animate = function(now = 0) {
    this.requestId = window.requestAnimationFrame(this.animate.bind(this));
    const time = this.time;
    time.elapsed = now - time.start;
    if(time.elapsed > time.level) {
        time.start = now;
        this.drop();
    }
}

App.prototype.moveBlock = {
    [KEYS.RIGHT]: e => ({...e, x: e.x + 1}),
    [KEYS.LEFT]: e => ({...e, x: e.x - 1}),
    [KEYS.DOWN]: e => ({...e, y: e.y + 1}),
    [KEYS.UP]: function(e){
        return this.piece.rotateShape({...e});
    },
}

App.prototype.addKeyListener = function() {
    const that = this;
    document.addEventListener('keydown', function(e) {
        if(e.keyCode === KEYS.SPACE) {
            let piece;
            while(that.board.vailDation(piece = that.moveBlock[KEYS.DOWN](that.piece))) {
                that.piece.moveBlock(piece);
                that.drawScreen();
            }
        }
        else if(that.moveBlock[e.keyCode]) {
            const piece = that.moveBlock[e.keyCode].call(that, that.piece);
            if(that.board.vailDation(piece)) {
                that.piece.moveBlock(piece);
                that.drawScreen();
            }
        }
    });
}

App.prototype.drop = function() {
    const piece = this.moveBlock[KEYS.DOWN](this.piece);
    if(this.board.vailDation(piece)) {
        this.piece.moveBlock(piece);
    }
    else {
        this.board.writeBoard(this.piece);
        this.board.removeLine();
        if(this.makePiece()) {
            this.gameOver();
            return;
        }
    }
    this.drawScreen();
}

App.prototype.drawScreen = function() {
    this.board.clear();
    this.board.draw();
    this.piece.draw();
}

App.prototype.makePiece = function() {
    return !this.board.checkfline(this.piece = new Piece(this.context));
}

App.prototype.gameOver = function() {
    alert('Game Over');
    cancelAnimationFrame(this.requestId); 
}

window.onload = function() {
    new App();
}