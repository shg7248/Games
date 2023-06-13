import { FPS } from './Constant.js';
import Board from './Board.js';

function Game() {
    this.canvas = document.querySelector('#game');
    this.context = this.canvas.getContext('2d');
    
    this.board = new Board(this.context);

    this.pacman = this.board.getPacman();
    this.enemy = this.board.getEnemy();

    this.enemy.serachInit(this.pacman);
    this.enemy.search();

    setInterval( e => {
        this.board.clearRect();

        this.pacman.move(this.board);
        this.enemy.move(this.pacman);
        
        this.board.draw();
        this.pacman.draw();
        this.enemy.drawEnemy();
        console.log('dffdsfsdfsd');
    }, 300);

}

window.onload = function() {
    new Game();
}
