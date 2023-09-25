import { getRookMoves } from './rookMoves';
import { getBishopMoves } from './bishopMoves';

export function getQueenMoves(board, position) {
    return [...getRookMoves(board, position), ...getBishopMoves(board, position)];
}
