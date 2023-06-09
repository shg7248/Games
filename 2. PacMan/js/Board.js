import { SIZE, MoveDirection } from './Constant.js';
import PacMan from './PacMan.js';
import Enemy from './Enemy.js';

export default function Board(context) {
    this.context = context;
    this.map = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 4, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 5, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ]

    this.context.canvas.width = this.map[0].length * SIZE;
    this.context.canvas.height = this.map.length * SIZE;
    this.context.scale(SIZE, SIZE);
}

Board.prototype.draw = function() {
    this.map.forEach((value, dy) => {
        value.forEach((value, dx) => {
            
            // this.context.strokeStyle = 'yellow';
            // this.context.lineWidth = 0.1;
            // this.context.strokeRect(dx, dy, 1, 1);

            if(value === 1) {
                this.context.fillStyle = 'blue';
            }
            else if(value === 0) {
                this.context.fillStyle = 'black';
            }
            this.context.fillRect(dx, dy, 1, 1);
        })
    })
}

Board.prototype.getPacman = function() {
    let pacman = null;
    this.map.every((value, dy) => {
        value.forEach((value, dx) => {
            if(value === 4) {
                pacman = new PacMan(this.context, dx, dy);
                this.map[dy][dx] = 0;
                return false;
            }
            return true
        })
        return true; 
    })
    return pacman;
}

Board.prototype.getEnemy = function(pacman) {
    let enemy = null;
    this.map.every((value, dy) => {
        value.forEach((value, dx) => {
            if(value === 5) {
                enemy = new Enemy(this.context, this.map, pacman, dx, dy);
                this.map[dy][dx] = 0;
                return false;
            }
            return true
        })
        return true; 
    })
    return enemy;    
}

Board.prototype.isWall = function(x, y, direction) {

    switch(direction) {
        case MoveDirection.left:
            x -= 1;
            break;
        case MoveDirection.right:
            x += 1;
            break;
        case MoveDirection.top:
            y -= 1;
            break;
        case MoveDirection.down:
            y += 1;
            break;
    }
    return this.map[y][x];
}

Board.prototype.clearRect = function() {
    this.context.clearRect(0, 0, this.context.canvas.width,this.context.canvas.height);
}