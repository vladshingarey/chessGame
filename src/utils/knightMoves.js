export function getKnightMoves(board, position) {
    const { row, col } = position;
    const moves = [];
    const knightJumps = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

    for (const [dx, dy] of knightJumps) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) continue;

        const targetSquare = board[newRow][newCol];

        if (!targetSquare.pieceId || targetSquare.pieceId.includes("White") !== board[row][col].pieceId.includes("White")) {
            moves.push({ row: newRow, col: newCol });
        }
    }
    return moves;
}
