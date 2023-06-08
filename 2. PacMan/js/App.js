import { FPS } from './Constant.js';
import Board from './Board.js';

function Game() {
    this.canvas = document.querySelector('#game');
    this.context = this.canvas.getContext('2d');
    
    this.board = new Board(this.context);

    this.pacman = this.board.getPacman();
    const enemy = this.board.getEnemy(this);
    
    setInterval( e => {
        this.board.clearRect();
    
        this.pacman.move(this.board);
        // enemy.search(board);
        
        this.board.draw();
        // enemy.draw();
        this.pacman.draw();
    }, 1000 / FPS);

}

window.onload = function() {
    new Game();
}
