import { getRookMoves } from './rookMoves';
import { getBishopMoves } from './bishopMoves';

export function getQueenMoves(board, position) {
    // Get the rook moves and the bishop moves and combine them
    return [...getRookMoves(board, position), ...getBishopMoves(board, position)];
}
