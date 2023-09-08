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

    return moves;
}
