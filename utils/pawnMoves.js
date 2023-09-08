export function getPawnMoves(board, position, lastMove) {
    const piece = board[position.row][position.col];
    
    if (!piece || !piece.pieceId || !piece.pieceId.includes('pawn')) {
        return [];  // Not a pawn
    }

    const direction = piece.pieceId.includes('White') ? -1 : 1;
    const moves = [];

    // Check for one step ahead
    const oneStepAhead = {
        row: position.row + direction,
        col: position.col
    };
    if (isValidSquare(oneStepAhead) && !board[oneStepAhead.row][oneStepAhead.col].pieceId) {
        moves.push(oneStepAhead);
    }

    // Check for two steps ahead (only from starting position)
    if ((position.row === 1 || position.row === 6) && moves.length > 0) {
        const twoStepsAhead = {
            row: position.row + 2 * direction,
            col: position.col
        };
        if (isValidSquare(twoStepsAhead) && !board[twoStepsAhead.row][twoStepsAhead.col].pieceId) {
            moves.push(twoStepsAhead);
        }
    }

    // Check for captures
    const leftCapture = {
        row: position.row + direction,
        col: position.col - 1
    };
    const rightCapture = {
        row: position.row + direction,
        col: position.col + 1
    };

    // Regular captures
    if (isValidSquare(leftCapture) && isOpponent(piece, board[leftCapture.row][leftCapture.col])) {
        moves.push(leftCapture);
    }
    if (isValidSquare(rightCapture) && isOpponent(piece, board[rightCapture.row][rightCapture.col])) {
        moves.push(rightCapture);
    }

    // Handle en passant
    if (lastMove) {
        const lastMovedPiece = board[lastMove.destRow][lastMove.destCol];
        if (
            lastMovedPiece && lastMovedPiece.pieceId.includes('pawn') && 
            isOpponent(piece, lastMovedPiece)
        ) {
            // For white pawns
            if (piece.pieceId.includes("White") && position.row === 3 && lastMove.destRow === 3 && Math.abs(position.col - lastMove.destCol) === 1) {
                moves.push({ row: 2, col: lastMove.destCol });
            }
            // For black pawns
            else if (piece.pieceId.includes("Black") && position.row === 4 && lastMove.destRow === 4 && Math.abs(position.col - lastMove.destCol) === 1) {
                moves.push({ row: 5, col: lastMove.destCol });
            }
        }
    }

    return moves;
}

function isValidSquare(position) {
    return position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8;
}

function isOpponent(currentPiece, targetSquare) {
    if (!targetSquare.pieceId) return false;
    return currentPiece.pieceId.includes('White') !== targetSquare.pieceId.includes('White');
}
