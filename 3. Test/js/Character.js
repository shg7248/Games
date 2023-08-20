
export default function Character(context, x, y) {
    /** @type {CanvasRenderingContext2D} */ 
    this.context = context;
    this.x = x;
    this.y = y;
    
    this.draw();
    this.keydown();
}

Character.prototype.draw = function() {
    this.context.fillRect(this.x, this.y, 1, 1);
}

Character.prototype.keydown = function() {
    document.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case 32:
                console.log('space');
                break;
        }
    });
}