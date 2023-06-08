import { FPS } from './Constant.js';
import Board from './Board.js';

const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

const board = new Board(context);
const pacman = board.getPacman();

setInterval(loop, 1000 / FPS);
function loop() {
    board.clearRect();

    pacman.move(board);

    board.draw();
    pacman.draw();
}