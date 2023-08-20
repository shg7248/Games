import {SIZE} from './Constant.js';

export default function Board(context) {
    /** @type {CanvasRenderingContext2D} */ 
    this.context = context;
    this.context.canvas.width = SIZE.SIZE * SIZE.WIDTH;
    this.context.canvas.height= SIZE.SIZE * SIZE.HEIGHT;
    this.context.scale(SIZE.SIZE, SIZE.SIZE);
}

Board.prototype.drawBackground = function() {
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 0.1;
    this.context.strokeRect(0, 0, SIZE.WIDTH, SIZE.HEIGHT);
}

Board.prototype.draw = function() {
    this.drawBackground();
}