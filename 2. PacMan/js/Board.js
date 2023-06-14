import { SIZE, MAP, MoveDirection } from './Constant.js';
import PacMan from './PacMan.js';
import Enemy from './Enemy.js';

export default function Board(context) {
    this.context = context;
    this.map = MAP;

    this.context.canvas.width = this.map[0].length * SIZE;
    this.context.canvas.height = this.map.length * SIZE;
    this.context.scale(SIZE, SIZE);

    this.image = new Image();
    this.image.src = './images/먹이.png';
}

Board.prototype.draw = function() {
    this.map.forEach((value, dy) => {
        value.forEach((value, dx) => {

            this.context.strokeStyle = 'black';
            this.context.lineWidth = 0.1;
            this.context.strokeRect(dx, dy, 1, 1);

            switch(value) {
                case 0:
                    this.context.fillStyle = 'black';
                    this.context.fillRect(dx, dy, 1, 1);
                    break;
                case 1:
                    this.context.fillStyle = 'blue';
                    this.context.fillRect(dx, dy, 1, 1);
                    break;
                case 7:
                    this.context.drawImage(this.image, dx, dy, 1, 1);
                    break;
            }
        })
    })
}

Board.prototype.getPacman = function() {
    let pacman = null;
    this.map.every((value, dy) => {
        value.forEach((value, dx) => {
            if(value === 2) {
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
            if(value === 3) {
                enemy = new Enemy(this.context, dx, dy);
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
    return this.map[y][x] === 1;
}

Board.prototype.isCookie = function(x, y) {
    return this.map[y][x] === 7;
}

Board.prototype.isCrash = function(pacman, enemy) {
    
}

Board.prototype.clearRect = function() {
    this.context.clearRect(0, 0, this.context.canvas.width,this.context.canvas.height);
}