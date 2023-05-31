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

    this.started = false;

    this.canvas = document.querySelector('#app');
    this.context = this.canvas.getContext('2d');

    this.startBtn = document.querySelector('#start');
    this.score_ = document.querySelector('#score');

    this.context.canvas.width = WIDTH;
    this.context.canvas.height = HEIGHT;

    this.context.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.time = {start: 0, elapsed: 0, level: 500};

    this.board = new Board(this);
    this.piece = new Piece(this.context);

    this.startBtn.addEventListener('click', this.start.bind(this));
}

App.prototype.start = function() {
    if(!this.started) {
        this.started = true;
        // 키 이벤트
        this.boundEventHandler = this.addKeyListener.bind(this);
        document.addEventListener('keydown', this.boundEventHandler);
        // 아래로 내려가는 애니메이션
        this.requestId = window.requestAnimationFrame(this.animate.bind(this));
    }
}

App.prototype.animate = function(now = 0) {
    // drop 메서드 위에 써줘야 함
    this.requestId = window.requestAnimationFrame(this.animate.bind(this));
    this.time.elapsed = now - this.time.start;
    if(this.time.elapsed > this.time.level) {
        this.time.start = now;
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
        }
        this.drop();
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
        this.score_
        if(!this.makePiece()) {
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
 * 새로운 블록을 생성하고
 * 생성된 블록이 나오나자마 쌓여있는 블록과 겹치게 되면 return true를 해준다. (Game Over 조건)
 */
App.prototype.makePiece = function() {
    return this.board.checkfline(this.piece = new Piece(this.context));
}

/**
 * 
 */
App.prototype.gameOver = function() {
    alert('Game Over');
    cancelAnimationFrame(this.requestId);
    document.removeEventListener('keydown', this.boundEventHandler); // 이벤트를 제거 안해주면 중복으로 적용됨
    this.board.clear();
    this.board.initBoard();
    this.started = false;
}

window.onload = function() {
    new App();
}