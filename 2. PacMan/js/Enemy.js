import { Dx, Dy } from './Constant.js';
import Node from './Node.js';

function sort(openNodeList) {
    return openNodeList.sort((a, b) => a.f - b.f || a.h - b.h);
}

function calcPath(x, y, currNode, targetNode) {
    return {
        g: currNode && (currNode.g + 10) || 0,
        h: 10 * (Math.abs(targetNode.x - x) + Math.abs(targetNode.y - y)),
        f: function() {
            return this.g + this.h;
        }
    }
}

export default function Enemy(context, board, pacman, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;

    this.openNodeList = [];
    this.closeNodeList = [];

    this.board = board.map((value, dy) => {
        return value.map((value, dx) => {
            return value == 1 ? new Node(dx, dy, true) : new Node(dx, dy, false);
        })
    })

    this.startNode = this.board[this.y][this.x];
    this.targetNode = this.board[pacman.ry][pacman.rx];

    this.openNodeList.push(this.startNode);
}

Enemy.prototype.draw = function() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, 1, 1);
}

Enemy.prototype.search = function(board) {
    const currNode = sort(this.openNodeList)[0];
    this.closeNodeList.push(this.openNodeList.splice(this.openNodeList.indexOf(currNode), 1)[0]);

    for(let i = 0; i < Dy.length; i++) {
        const x = currNode.x + Dx[i], y = currNode.y + Dy[i];

        if(!this.board[y] || this.board[y] && !this.board[y][x]) {
            continue;
        }

        if(this.board[y][x].is_wall || this.closeNodeList.includes(this.board[y][x])) {
            continue;
        }

        const childNode = calcPath(x, y, currNode, this.targetNode);
        const boardNode = calcPath(this.board[y][x].x, this.board[y][x].y, currNode, this.targetNode);

        if(childNode.g < boardNode.g || !this.openNodeList.includes(this.board[y][x])) {
            new Promise((resolve, reject) => {
                resolve(this.board[y][x]);
            })
            .then((data) => {
                this.openNodeList.push(data);
            })
        }

    }
    console.log(this.openNodeList);
}