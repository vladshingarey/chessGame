import * as pieceMoves from '../index';

const getValidMovesForPiece = (board, pieceType, piece, lastMove) => {

    switch(pieceType) {
        case "pawnWhite":
        case "pawnBlack":
            return pieceMoves.getPawnMoves(board, { row: piece.rowIndex, col: piece.colIndex }, lastMove);
        case "rookWhite":
        case "rookBlack":
            return pieceMoves.getRookMoves(board, { row: piece.rowIndex, col: piece.colIndex });
        case "bishopWhite":
        case "bishopBlack":
            return pieceMoves.getBishopMoves(board, { row: piece.rowIndex, col: piece.colIndex });
        case "knightWhite":
        case "knightBlack":
            return pieceMoves.getKnightMoves(board, { row: piece.rowIndex, col: piece.colIndex });
        case "queenWhite":
        case "queenBlack":
            return pieceMoves.getQueenMoves(board, { row: piece.rowIndex, col: piece.colIndex });
        case "kingWhite":
        case "kingBlack":
            return pieceMoves.getKingMoves(board, { row: piece.rowIndex, col: piece.colIndex });
        default:
            return [];
    }
};
export default getValidMovesForPiece;
