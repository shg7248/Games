'use strict';

import * as common from './common.js';
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

    this.board = new Board(this.context);
    this.piece = new Piece(this);

    // addEventListener 내에서 실행되야 하기 때문에 bind 시켜줌
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

        // 블록이 한칸씩 아래로 내려옴
        this.moveOrRotateBlock();
    }
}

/**
 *  테트리스 버튼 이벤트
 */
App.prototype.addKeyListener = function(e) {

    // 스크롤 이동 방지
    e.preventDefault();

    this.moveOrRotateBlock(e.which);
}

/**
 *  블록을 이동하거나 회전시킨다.
 *  @returns
 */
App.prototype.moveOrRotateBlock = function(keyEvent) 
{

    const key = keyEvent || KEYS.DOWN;

    // 블록을 한번에 내리는 경우
    if(KEYS.SPACE === key) 
    {
        this.board.writeBoard(this.piece.최종낙하지점기준객체리턴());
        this.board.removeLine();
        this.makePiece();
    }
    else 
    {
        const piece = common.moveBlock[key].call(this, (this.piece));

        if(this.board.vailDation(piece)) {
            this.piece.moveBlock(piece);
        }
        else 
        {
            if(!keyEvent)
            {
                this.board.writeBoard(this.piece);
                this.board.removeLine();
                this.makePiece();
            }
        }
    }
    this.drawScreen();
}

/**
 *  백그라운드를 참고해서 테트리스 화면을 그려준다
 */
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
    return this.board.checkfline(this.piece = new Piece(this));
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