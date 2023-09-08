import * as pieceImages from '../../assets/pieceImages/index';
import cloneDeep from 'lodash/cloneDeep';
import captureSound from '../../assets/moveSounds/captureSound.mp3';


function movePiece(board, selectedPiece, destRow, destCol, onCapture, lastMove) {

    //const audio = new Audio(sound1);
    //audio.play();
    const playCaptureSound = new Audio(captureSound);
    
    

    // board: current board
    // selectedPiece: current piece being moved
    // destRow: row destination
    // destCol: col destination
    // onCapture: keep track of piece captured.


    const newBoard = cloneDeep(board);
    //const newBoard = board.map(row => row.slice());
    let capturedPieceId = null;

    if (lastMove && selectedPiece.id.includes('pawn')){
        capturedPieceId = newBoard[destRow][destCol].pieceId;
        if (selectedPiece.id.includes('pawnWhite') && destRow === 2 && destCol === lastMove.destCol) {
            capturedPieceId = newBoard[lastMove.destRow][lastMove.destCol].pieceId;
            newBoard[lastMove.destRow][lastMove.destCol].pieceId = null;
            newBoard[lastMove.destRow][lastMove.destCol].pieceImgSrc = null;
        } 
        else if (selectedPiece.id.includes('pawnBlack') && destRow === 5 && destCol === lastMove.destCol) {
            capturedPieceId = newBoard[lastMove.destRow][lastMove.destCol].pieceId;
            newBoard[lastMove.destRow][lastMove.destCol].pieceId = null;
            newBoard[lastMove.destRow][lastMove.destCol].pieceImgSrc = null;
        }
    }
    else {
        capturedPieceId = newBoard[destRow][destCol].pieceId;
    }
    
    

    if (capturedPieceId && onCapture) {
    
        playCaptureSound.play();        
        const color = capturedPieceId.includes('White') ? 'white' : 'black';
        onCapture({
            id: capturedPieceId,
            color: color
        });
    }



    let lastMoveUpdate = null;

    let newPieceId = getUpdatedPieceId(selectedPiece.id, destRow, destCol);




    // Pawn promotion logic:
    
    if (selectedPiece.id.includes('pawnWhite') && destRow === 0) {
        newPieceId = `queenWhite-${destRow}-${destCol}`;
    } else if (selectedPiece.id.includes('pawnBlack') && destRow === 7) {
        newPieceId = `queenBlack-${destRow}-${destCol}`;
    }

    // Check for 2-step pawn move:
    if (selectedPiece.id.includes('pawn') && Math.abs(selectedPiece.rowIndex - destRow) === 2) {
        lastMoveUpdate = { pawn: selectedPiece.id, destRow, destCol };
        
    }



    // Kingside castling:
    if (selectedPiece.id.includes('king') && destCol - selectedPiece.colIndex === 2) {
        // Update the king's position as you're already doing in movePiece

        // Move the corresponding rook:
        const rookOriginalCol = 7; // assuming 0-based index, the rook starts at the last column
        const rookDestCol = 5;     // rook's destination after kingside castling

        // Update the rook's position:
        const rookPieceId = `rook${selectedPiece.id.includes('White') ? 'White' : 'Black'}-${selectedPiece.rowIndex}-${rookDestCol}`;

        newBoard[selectedPiece.rowIndex][rookOriginalCol] = {
            ...newBoard[selectedPiece.rowIndex][rookOriginalCol],
            pieceId: null,
            pieceImgSrc: null,
            selected: false,
            hasMoved: true
        };

        newBoard[selectedPiece.rowIndex][rookDestCol] = {
            ...newBoard[selectedPiece.rowIndex][rookDestCol],
            pieceId: rookPieceId,
            pieceImgSrc: pieceImages[rookPieceId.split('-')[0]],
            rowIndex: selectedPiece.rowIndex,
            colIndex: rookDestCol,
            hasMoved: true
        };
        
    }
    // Queenside castling:
    else if (selectedPiece.id.includes('king') && selectedPiece.colIndex - destCol === 2) {
        // Update the king's position as you're already doing in movePiece

        // Move the corresponding rook:
        const rookOriginalCol = 0; // assuming 0-based index, the rook starts at the first column
        const rookDestCol = 3;     // rook's destination after queenside castling

        // Update the rook's position:
        const rookPieceId = `rook${selectedPiece.id.includes('White') ? 'White' : 'Black'}-${selectedPiece.rowIndex}-${rookDestCol}`;

        newBoard[selectedPiece.rowIndex][rookOriginalCol] = {
            ...newBoard[selectedPiece.rowIndex][rookOriginalCol],
            pieceId: null,
            pieceImgSrc: null,
            selected: false,
            hasMoved: true
        };

        newBoard[selectedPiece.rowIndex][rookDestCol] = {
            ...newBoard[selectedPiece.rowIndex][rookDestCol],
            pieceId: rookPieceId,
            pieceImgSrc: pieceImages[rookPieceId.split('-')[0]],
            rowIndex: selectedPiece.rowIndex,
            colIndex: rookDestCol,
            hasMoved: true
        };

    }

    // Updating the board:
    newBoard[selectedPiece.rowIndex][selectedPiece.colIndex] = {
        ...newBoard[selectedPiece.rowIndex][selectedPiece.colIndex],
        pieceId: null,
        pieceImgSrc: null,
        selected: false,
        hasMoved: true
    };

// Assigning the new piece ID to the destination
    newBoard[destRow][destCol] = {
        ...newBoard[destRow][destCol],
        pieceId: newPieceId,
        pieceImgSrc: pieceImages[newPieceId.split('-')[0]],
        rowIndex: destRow, // updating the rowIndex of the moved piece
        colIndex: destCol  // updating the colIndex of the moved piece
    };


    return { newBoard, lastMoveUpdate };
}
export default movePiece;




function getUpdatedPieceId(pieceId, destRow, destCol) {
    const pieceTypeColor = pieceId.split('-')[0];
    return `${pieceTypeColor}-${destRow}-${destCol}`;
}
