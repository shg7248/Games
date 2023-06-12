import { Dx, Dy } from './Constant.js';
import Node from './Node.js';

function sort(openNodeList) {
    return openNodeList.sort((a, b) => a.f() - b.f() || a.h - b.h);
}

function calcPath(x, y, parentNode, targetNode) {
    return {
        g: parentNode && (parentNode.g + 10) || 0,
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
            return value === 1 ? new Node(dx, dy, true) : new Node(dx, dy, false);
        })
    })

    this.startNode = this.board[this.y][this.x];
    this.targetNode = this.board[pacman.ry][pacman.rx];

    this.openNodeList.push(this.startNode);

    this.path = [];
}

Enemy.prototype.draw = function() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, 1, 1);
}

Enemy.prototype.search = function(board) {
    while(this.openNodeList) {
        const currNode = sort(this.openNodeList)[0];
        this.closeNodeList.push(this.openNodeList.splice(this.openNodeList.indexOf(currNode), 1)[0]);
    
        if(currNode.x === this.targetNode.x && currNode.y === this.targetNode.y) {
            console.log('end');
            return;
        }

        for(let i = 0; i < Dy.length; i++) {
            const x = currNode.x + Dx[i], y = currNode.y + Dy[i];
    
            if(!this.board[y] || this.board[y] && !this.board[y][x]) {
                continue;
            }
    
            if(this.board[y][x].is_wall || this.closeNodeList.includes(this.board[y][x])) {
                continue;
            }
    
            const childNode = calcPath(x, y, currNode, this.targetNode);
            
            if(this.openNodeList.includes(this.board[y][x])) {
                if(childNode.g < currNode.g) {
                    continue;
                }
            }

            // if(childNode.g < this.board[y][x].g || !this.openNodeList.includes(this.board[y][x])) {
            //     ((data) => {


            //         this.openNodeList.push(data);
            //     })(this.board[y][x]);
            // }
        }
    }
}