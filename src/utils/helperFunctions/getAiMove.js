import getValidMovesForPiece from "./getValidMovesForPiece";
import cloneDeep from 'lodash/cloneDeep';
import { isKingInCheck } from "./kingChecks";
import movePiece from "./movePiece";
import { findKing } from "./kingChecks";


function randomMoveForBlack(boardState, lastMoveState, onCapture) {
    let blackPiecesWithMoves = [];

    for(let row = 0; row < 8; row++) {
        for(let col = 0; col < 8; col++) {
            const pieceId = boardState[row][col].pieceId;
            if(pieceId && pieceId.includes('Black')) {
                const pieceType = pieceId.split('-')[0];
                const moves = getValidMovesForPiece(boardState, pieceType, { id: pieceId, rowIndex: row, colIndex: col }, lastMoveState)
                             .filter(move => {
                                 let simulatedBoard = cloneDeep(boardState);
                                 const { newBoard: resultingBoard } = movePiece(simulatedBoard, { id: pieceId, rowIndex: row, colIndex: col }, move.row, move.col);
                                 const kingPosition = findKing(resultingBoard, 'black');
                                 return !isKingInCheck(resultingBoard, kingPosition);
                             });

                if (moves.length > 0) {
                    blackPiecesWithMoves.push({ id: pieceId, rowIndex: row, colIndex: col, moves: moves });
                }
            }
        }
    }

    if(blackPiecesWithMoves.length > 0) {
        const randomPieceIndex = Math.floor(Math.random() * blackPiecesWithMoves.length);
        const randomPiece = blackPiecesWithMoves[randomPieceIndex];
        const randomMoveIndex = Math.floor(Math.random() * randomPiece.moves.length);
        const randomMove = randomPiece.moves[randomMoveIndex];
        const newBoard = movePiece(boardState, { id: randomPiece.id, rowIndex: randomPiece.rowIndex, colIndex: randomPiece.colIndex }, randomMove.row, randomMove.col, onCapture).newBoard;
        
        return {
            newBoard: newBoard,
            source: { rowIndex: randomPiece.rowIndex, colIndex: randomPiece.colIndex },
            destination: { rowIndex: randomMove.row, colIndex: randomMove.col }
        };
    }
    return {
        newBoard: boardState,
        source: null,
        destination: null
    };
}
export default randomMoveForBlack;
