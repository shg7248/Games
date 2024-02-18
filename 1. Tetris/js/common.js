import {INNER_BLOCK_SIZE, KEYS} from './constant.js';

export function drawInnerBlock(dx, dy) {
    const   x = dx + INNER_BLOCK_SIZE,
            y = dy + INNER_BLOCK_SIZE,
            w = 1 - INNER_BLOCK_SIZE * 2,
            h = 1 - INNER_BLOCK_SIZE * 2;
    this.context.fillRect(x, y, w, h);
}

export const moveBlock = {
    [KEYS.RIGHT]: piece => ({...piece, x: piece.x + 1}),
    [KEYS.LEFT]: piece => ({...piece, x: piece.x - 1}),
    [KEYS.DOWN]: piece => ({...piece, y: piece.y + 1}),
    [KEYS.UP]: function(piece){
        return this.piece.rotateShape({...piece});
    },
}