import * as pieceImages from '../../assets/pieceImages/index';

function initializeBoard() {
    const startingPositions = {
        0: ['rookBlack', 'knightBlack', 'bishopBlack', 'queenBlack', 'kingBlack', 'bishopBlack', 'knightBlack', 'rookBlack'],
        1: Array(8).fill('pawnBlack'),
        7: ['rookWhite', 'knightWhite', 'bishopWhite', 'queenWhite', 'kingWhite', 'bishopWhite', 'knightWhite', 'rookWhite'],
        6: Array(8).fill('pawnWhite'),
    };

    return Array(8).fill(null).map((_, rowIndex) => {
        return Array(8).fill(null).map((_, colIndex) => {
            const pieceId = startingPositions[rowIndex]?.[colIndex];
            const color = (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black';
            
            return {
                color,
                pieceColor: pieceId ? (pieceId.includes('White') ? 'white' : 'black') : null,
                pieceId: pieceId ? `${pieceId}-${rowIndex}-${colIndex}` : null,
                pieceImgSrc: pieceId ? pieceImages[pieceId] : null,
                selected: false,
                hasMoved: false
            };
        });
    });
}
export default initializeBoard;