import { MAP, DX, DY, MoveDirection } from './Constant.js';
import Node from './Node.js';

export default function Enemy(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;

    this.requestedMove = null;

    this.drawNode();
}

Enemy.prototype.drawNode = function() {
    this.map = MAP.map((value, dy) => {
        return value.map((value, dx) => {
            return value === 1 ? new Node(dx, dy, true) : new Node(dx, dy, false);
        })
    })
    console.table(this.map);
}

Enemy.prototype.drawEnemy = function() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, 1, 1);
}

Enemy.prototype.sort = function() {
    return this.openList.sort((a, b) => (a.g + a.h) - (b.g + a.h) || a.h - b.h);
}

Enemy.prototype.serachInit = function(pacman) {
    this.pacman = pacman;
    this.openList = [];
    this.closeList = [];
    this.path = [];

    this.currNode = this.map[this.y][this.x];
    this.currNode.g = 0;
    this.currNode.h = 10 * (Math.abs(this.pacman.rx - this.currNode.rx) + Math.abs(this.pacman.y - this.currNode.y));
    this.openList.push(this.currNode);
}

Enemy.prototype.search = function() {
    while(this.openList) {
        this.parentNode = this.sort()[0];
        this.closeList.push(this.openList.splice(this.openList.indexOf(this.parentNode), 1)[0]);

        if(this.parentNode.x === this.pacman.x && this.parentNode.y === this.pacman.y) {

            while(this.parentNode) {
                this.path.push(this.parentNode);
                this.parentNode = this.parentNode.parentNode;
            }
            return;
        }

        for(let i = 0; i < DY.length; i++) {
            const x = this.parentNode.x + DX[i], y = this.parentNode.y + DY[i];

            // 맵을 벗어나는 경우
            if(!this.map[y] || this.map[y] && !this.map[y][x]) continue;

            // 닫힌목록에 포함되어 있거나 벽인 경우
            if(this.closeList.includes(this.map[y][x]) || this.map[y][x].is_wall) continue;

            const g = this.parentNode.g + 10;
            const h = 10 * (Math.abs(this.pacman.x - x) + Math.abs(this.pacman.y - y));

            if(this.openList.includes(this.map[y][x]) && g < this.map[y][x].g) {
                this.map[y][x].parentNode = this.parentNode;
                this.map[y][x].g = g;
                this.map[y][x].h = h;
                continue;
            }

            this.map[y][x].parentNode = this.parentNode;
            this.map[y][x].g = g;
            this.map[y][x].h = h;   
            this.openList.push(this.map[y][x]);
        }
    }
    
}

Enemy.prototype.direction = function() {
    const path = this.path.sort(() => -1);
    let x = Math.round(this.x * 1e2) / 1e2;
    let y = Math.round(this.y * 1e2) / 1e2;
    
    x = path[1].x - x, y = path[1].y - y;

    if(x === 0) {
        if(y > 0) {
            this.requestedMove = MoveDirection.down;
        }
        else {
            this.requestedMove = MoveDirection.top;
        }
    }

    if(y === 0) {
        if(x > 0) {
            this.requestedMove = MoveDirection.right;
        }
        else {
            this.requestedMove = MoveDirection.left;
        }       
    }

    console.log('적이 움직여야 할 방향 : ' + this.requestedMove);
}

Enemy.prototype.move = function(pacman) {

    const x = Math.round(this.x * 1e2) / 1e2;
    const y = Math.round(this.y * 1e2) / 1e2;

    const isIntegerXY = Number.isInteger(x) && Number.isInteger(y);

    if(isIntegerXY) {
        this.x = x, this.y = y;
        this.serachInit(pacman);
        this.search();
        this.direction();
        this.currentMove = this.requestedMove;
    }

    switch(this.currentMove) {
        case MoveDirection.left:
            this.x -= 0.05;
            break;
        case MoveDirection.right:
            this.x += 0.05;
            break;
        case MoveDirection.top:
            this.y -= 0.05;
            break;
        case MoveDirection.down:
            this.y += 0.05;
            break;
    }
}