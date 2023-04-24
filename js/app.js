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
    // 키 이벤트
    document.addEventListener('keydown', this.addKeyListener.bind(this));
    // 아래로 내려가는 애니메이션
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

App.prototype.addKeyListener = function(e) {
    if(e.keyCode === KEYS.SPACE) {
        let piece;
        while(this.board.vailDation(piece = this.moveBlock[KEYS.DOWN](this.piece))) {
            this.piece.moveBlock(piece);
            this.drawScreen();
        }
    }
    else if(this.moveBlock[e.keyCode]) {
        const piece = this.moveBlock[e.keyCode].call(this, this.piece);
        if(this.board.vailDation(piece)) {
            this.piece.moveBlock(piece);
            this.drawScreen();
        }
    }
}

/**
 * requestAnimationFrame이 호출하면 한칸씩 자동으로 내려간다.
 */
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

/**
 * 블록을 생성하고
 * 생성된 블록이 나오나자마 쌓여있는 블록과 겹치게 되면 return true를 해준다. (Game Over 조건)
 */
App.prototype.makePiece = function() {
    return !this.board.checkfline(this.piece = new Piece(this.context));
}

/**
 * Game Over시 requestAnimationFrame을 정지시킨다.
 */
App.prototype.gameOver = function() {
    alert('Game Over');
    cancelAnimationFrame(this.requestId);
}

window.onload = function() {
    new App();
}