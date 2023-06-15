import { FPS } from './Constant.js';
import Board from './Board.js';

function Game() {
    this.canvas = document.querySelector('#game');
    this.context = this.canvas.getContext('2d');
    
    this.board = new Board(this.context);

    this.pacman = this.board.getPacman();
    this.enemy = this.board.getEnemy();

    this.loop = setInterval( e => {
        this.board.clearRect();
        
        this.pacman.move(this.board);
        this.enemy.move(this.pacman);

        if(this.board.isCrash(this.pacman, this.enemy)) {
            alert('Game Over');
            clearInterval(this.loop);
            return;
        }
        
        this.board.draw();
        this.pacman.draw();
        this.enemy.drawEnemy();
    }, 1000 / FPS);

}

window.onload = function() {
    new Game();
}
