'use strict';

import * as common from './common.js';
import {
    SHAPES,
    BLOCK_BOARDER_COLOR,
    KEYS,
} from './constant.js';

export default function Piece(app, x, y) {
    this.x = 3;
    this.y = 0;

    this._x = 0;
    this._y = 0;

    this.shapeInfo = SHAPES[Math.floor((Math.random() * SHAPES.length))];
    this.length = this.shapeInfo.shape.length;

    this.context = app.context;
    this.board = app.board;
    
    this.최종낙하지점계산();
}

/**
 * 그리드에 블록을 그려준다.
 */
Piece.prototype.draw = function() {

    // 내려오는 블럭 그리기
    this.shapeInfo.shape.forEach((e, dy) => {
        e.forEach((value, dx) => {
            if(value) {
                const y = this.y + dy;
                const x = this.x + dx;

                this.context.fillStyle = BLOCK_BOARDER_COLOR;
                this.context.fillRect(x, y, 1, 1);
                this.context.fillStyle = this.shapeInfo.color;
                common.drawInnerBlock.call(this, x, y);
            }
        });
    });

    // 미리보기 블럭 그리기
    this.shapeInfo.shape.forEach((e, dy) => {
        e.forEach((value, dx) => {
            if(value) {
                const y = this._y + dy;
                const x = this._x + dx;

                this.context.fillStyle = BLOCK_BOARDER_COLOR;
                this.context.fillRect(x, y, 1, 1);
                this.context.fillStyle = this.shapeInfo.color;
                common.drawInnerBlock.call(this, x, y);
            }
        });
    });
}


/**
 * ↑키를 누르면 블록을 회전한다.
 */
Piece.prototype.rotateShape = function(_pPiece) {
    const arr = _pPiece.shapeInfo.shape;
    const size = arr.length - 1;
    return {..._pPiece, shapeInfo: {..._pPiece.shapeInfo, shape: arr.map((_pPiece, dy) => {
        return _pPiece.map((value, dx) => {
            return arr[size - dx][dy];
        });
    })}};
}

/**
 * 블록의 위치와 회전에 따른 모양을 변경시켜준다.
 */
Piece.prototype.moveBlock = function(piece) {
    this.x = piece.x;
    this.y = piece.y;
    this.shapeInfo.shape = piece.shapeInfo.shape;

    this.최종낙하지점계산();
}

/**
 *  블록을 가장 아래까지 내렸을 경우 위치를 계산한다.
 */
Piece.prototype.최종낙하지점계산 = function() {

    let copyPiece = {...this}, newPiece = {};

    while(this.board.vailDation(newPiece = common.moveBlock[KEYS.DOWN](copyPiece))) {
        copyPiece.x = newPiece.x;
        copyPiece.y = newPiece.y;
    }

    this._x = copyPiece.x;
    this._y = copyPiece.y;
}

Piece.prototype.최종낙하지점기준객체리턴 = function() {
    return {
        ...this, 
        x: this._x, 
        y: this._y
    };
}