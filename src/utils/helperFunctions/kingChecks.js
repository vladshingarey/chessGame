import getValidMovesForPiece from "./getValidMovesForPiece";
import cloneDeep from 'lodash/cloneDeep';
import movePiece from "./movePiece";

export function isKingInCheck(board, kingPosition) {
    const opposingColor = (board[kingPosition.row][kingPosition.col].pieceId.includes('White')) ? 'Black' : 'White';
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pieceId = board[i][j].pieceId;
            if (pieceId && pieceId.includes(opposingColor)) {
                const pieceType = pieceId.split('-')[0];
                const validMoves = getValidMovesForPiece(board, pieceType, { id: pieceId, rowIndex: i, colIndex: j });

                for (const move of validMoves) {
                    if (move.row === kingPosition.row && move.col === kingPosition.col) {
                        return true; // King can be captured by an opposing piece
                    }
                }
            }
        }
    }
    return false; // King is safe
}

export function findKing(board, color) {
    color  = color.charAt(0).toUpperCase() + color.slice(1);
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col].pieceId && board[row][col].pieceId.includes(`king${color}`)) {
          return { row, col };
        }
      }
    }
    return null;
}
  
export function isKingCheckmated(board, color) {
    const kingPosition = findKing(board, color);
    
    if (!isKingInCheck(board, kingPosition)) {
        // If the king is not in check, it can't be checkmated
        return false;
    }

    // Check if there are any valid moves for the color's pieces
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pieceId = board[i][j].pieceId;
            if (pieceId && pieceId.includes(color.charAt(0).toUpperCase() + color.slice(1))) {
                const pieceType = pieceId.split('-')[0];
                const validMoves = getValidMovesForPiece(board, pieceType, { id: pieceId, rowIndex: i, colIndex: j });

                for (const move of validMoves) {
                    let simulatedBoard = cloneDeep(board);
                    const { newBoard: resultingBoard } = movePiece(simulatedBoard, { id: pieceId, rowIndex: i, colIndex: j }, 
                        move.row, move.col
                    );
                    const kingPositionAfterMove = findKing(resultingBoard, color);
                    if (!isKingInCheck(resultingBoard, kingPositionAfterMove)) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}






