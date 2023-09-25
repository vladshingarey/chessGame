export function getBishopMoves(board, position) {
    const { row, col } = position;
    const moves = [];
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]; 

    for (const [dx, dy] of directions) {
        for (let step = 1; step < 8; step++) {
            const newRow = row + dx * step;
            const newCol = col + dy * step;

            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

            const targetSquare = board[newRow][newCol];

            if (!targetSquare.pieceId) {
                moves.push({ row: newRow, col: newCol });
            } else {
                if (targetSquare.pieceId.includes("White") !== board[row][col].pieceId.includes("White")) {
                    moves.push({ row: newRow, col: newCol });
                }
                break; 
            }
        }
    }
    return moves;
}
