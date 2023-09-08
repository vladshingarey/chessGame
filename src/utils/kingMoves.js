import { isKingInCheck } from "./helperFunctions/kingChecks";
import cloneDeep from 'lodash/cloneDeep';

export function getKingMoves(board, position) {
    const { row, col } = position;
    const moves = [];
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], 
        [0, -1],           [0, 1], 
        [1, -1], [1, 0], [1, 1]
    ]; // Surrounding squares

    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) continue;

        const targetSquare = board[newRow][newCol];

        if (!targetSquare.pieceId || targetSquare.pieceId.includes("White") !== board[row][col].pieceId.includes("White")) {
            moves.push({ row: newRow, col: newCol });
        }
    }

    const kingColor = board[row][col].pieceId.includes("White") ? "White" : "Black";

    if(!board[row][col].hasMoved){
    // Kingside castling
        if (col + 2 < 8 && !board[row][col + 1].pieceId && !board[row][col + 2].pieceId && board[row][7] && !board[row][7].hasMoved) {
            console.log("TESTER");
            let hypotheticalBoard = cloneDeep(board);
            hypotheticalBoard[row][col].pieceId = null; // King moves from original position
        
            if (hypotheticalBoard[row] && hypotheticalBoard[row][col + 1]) {
                hypotheticalBoard[row][col + 1].pieceId = `king-${kingColor}`; // King moves to the next square
        
                if (!isKingInCheck(hypotheticalBoard, { row, col: col + 1 })) {
                    hypotheticalBoard[row][col + 1].pieceId = null; // Move king from this square
        
                    if (hypotheticalBoard[row] && hypotheticalBoard[row][col + 2]) {
                        hypotheticalBoard[row][col + 2].pieceId = `king-${kingColor}`; // King moves to the castling square
        
                        if (!isKingInCheck(hypotheticalBoard, { row, col: col + 2 })) {
                            moves.push({ row, col: col + 2 }); // Castling move
                        }
                    }
                }
            }
        }
    
    // Queenside castling
        if (col - 2 >= 0 && !board[row][col - 1].pieceId && !board[row][col - 2].pieceId && board[row][0] && !board[row][0].hasMoved) {
            let hypotheticalBoard = cloneDeep(board);
            hypotheticalBoard[row][col].pieceId = null; // King moves from original position
        
            if (hypotheticalBoard[row] && hypotheticalBoard[row][col - 1]) {
                hypotheticalBoard[row][col - 1].pieceId = `king-${kingColor}`; // King moves to the next square
        
                if (!isKingInCheck(hypotheticalBoard, { row, col: col - 1 })) {
                    hypotheticalBoard[row][col - 1].pieceId = null; // Move king from this square
        
                    if (hypotheticalBoard[row] && hypotheticalBoard[row][col - 2]) {
                        hypotheticalBoard[row][col - 2].pieceId = `king-${kingColor}`; // King moves to the castling square
        
                        if (!isKingInCheck(hypotheticalBoard, { row, col: col - 2 })) {
                            moves.push({ row, col: col - 2 }); // Castling move
                        }
                    }
                }
            }
        }

    }
    

    return moves;
}







