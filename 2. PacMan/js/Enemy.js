import { Dx, Dy } from './Constant.js';
import Node from './Node.js';

export default function Enemy(context, board, t, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;

    this.openNodeList = [];
    this.closeNodeList = [];

    this.board = board.map((value, dy) => {
        return value.map((value, dx) => {
            return board[dy][dx] == 1 ? new Node(dx, dy, true) : new Node(dx, dy, false);
        })
    })

    this.startNode = this.board[this.y][this.x];
    this.targetNode = this.board[t.pacman.y][t.pacman.x];

    this.openNodeList.push(this.startNode);
}

Enemy.prototype.draw = function() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, 1, 1);
}

Enemy.prototype.search = function(board) {
    const currNode = null;
}

Enemy.prototype.sort = function() {
    return this.openNodeList.sort((a, b) => a.f - b.f || a.h - b.h);
}