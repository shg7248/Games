import Character from './Character.js';
import Board from './Board.js';

function Game() {

    this.SIZE = 30;

    this.canvas = document.querySelector('#game');
    /** @type {CanvasRenderingContext2D} */ 
    this.context = this.canvas.getContext('2d');

    this.board = new Board(this.context);
    this.character = new Character(this.context, 0, 9);

    this.board.draw();
}

window.onload = function() {
    new Game();
}
