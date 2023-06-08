import { MoveDirection } from "./Constant.js";

export default function PacMan(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;

    this.rx = x;
    this.ry = y;

    this.currentMove = null;
    this.requestedMove = null;

    this.keydown();
}

PacMan.prototype.draw = function() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.x, this.y, 1, 1);
}

PacMan.prototype.keydown = function() {
    const that = this;
    document.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case 37:
                that.requestedMove = MoveDirection.left;
                break;
            case 39:
                that.requestedMove = MoveDirection.right;
                break;  
            case 38:
                that.requestedMove = MoveDirection.top;
                break;  
            case 40:
                that.requestedMove = MoveDirection.down;
                break;
        }
    })
}

PacMan.prototype.move = function(board) {

    const x = Math.round(this.x * 1e2) / 1e2;
    const y = Math.round(this.y * 1e2) / 1e2;

    const isIntegerXY = Number.isInteger(x) && Number.isInteger(y);

    if(isIntegerXY) {
        this.rx = x;
        this.ry = y;
    }

    if(this.currentMove !== this.requestedMove) {
        if(isIntegerXY) {
            if(!board.isWall(x, y, this.requestedMove)) {
                this.currentMove = this.requestedMove;
            }
        }
    }

    if(isIntegerXY && board.isWall(x, y, this.currentMove)) {
        return;
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