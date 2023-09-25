export function getPawnMoves(board, position, lastMove) {
    const { row, col } = position;
    const piece = board[row][col];

    if (!piece.pieceId) {
        return [];
    }

    if (!piece.pieceId.includes('pawn')) {
        return [];  // Not a pawn
    }

    const direction = piece.pieceId.includes('White') ? -1 : 1;
    const moves = [];

    // Check for one step ahead
    const oneStepAhead = {
        row: row + direction,
        col: col
    };
    if (isValidSquare(oneStepAhead) && !board[oneStepAhead.row][oneStepAhead.col].pieceId) {
        moves.push(oneStepAhead);
    }

    // Check for two steps ahead (only from starting position)
    if ((row === 1 || row === 6) && moves.length > 0) {
        const twoStepsAhead = {
            row: row + 2 * direction,
            col: col
        };
        if (isValidSquare(twoStepsAhead) && !board[twoStepsAhead.row][twoStepsAhead.col].pieceId) {
            moves.push(twoStepsAhead);
        }
    }

    // Capture left
    const leftCapture = {
        row: row + direction,
        col: col - 1
    };
    if (isValidSquare(leftCapture) && isOpponent(piece, board[leftCapture.row][leftCapture.col])) {
        moves.push(leftCapture);
    }

    // Capture right
    const rightCapture = {
        row: row + direction,
        col: col + 1
    };
    if (isValidSquare(rightCapture) && isOpponent(piece, board[rightCapture.row][rightCapture.col])) {
        moves.push(rightCapture);
    }

    // En Passant logic

    if (piece.pieceId.includes("pawnWhite") && lastMove && row === 3) {
        if (col === 0 && lastMove.destCol === 1) {
            moves.push(rightCapture);
        } else if (col === 7 && lastMove.destCol === 6) {
            moves.push(leftCapture);
        } else if (col > 0 && col < 7) {
            if (lastMove.destCol + 1 === col) {
                moves.push(leftCapture);
            }
            if (lastMove.destCol - 1 === col) {
                moves.push(rightCapture);
            }
        }
    } else if (piece.pieceId.includes("pawnBlack") && lastMove && row === 4) {
        if (col === 0 && lastMove.destCol === 1) {
            moves.push(rightCapture); 
        } else if (col === 7 && lastMove.destCol === 6) {
            moves.push(leftCapture); 
        } else if (col > 0 && col < 7) {
            if (lastMove.destCol + 1 === col) {
                moves.push(leftCapture); 
            }
            if (lastMove.destCol - 1 === col) {
                moves.push(rightCapture); 
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

