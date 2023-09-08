import ChessSquare from '../square/square';
import React, { useState, useEffect, useRef } from 'react';
import '../board/board.css';
import movePiece from '../../utils/helperFunctions/movePiece';
import getValidMovesForPiece from '../../utils/helperFunctions/getValidMovesForPiece';
import initializeBoard from '../../utils/helperFunctions/initializeBoard';
import { isKingInCheck, findKing, isKingCheckmated } from '../../utils/helperFunctions/kingChecks';
import cloneDeep from 'lodash/cloneDeep';
import selectSound from '../../assets/moveSounds/selectSound.mp3';
import checkMateSound from '../../assets/moveSounds/checkSound.mp3';
import checkSound from '../../assets/moveSounds/checkSound.mp3';
import randomMoveForBlack from '../../utils/helperFunctions/getAiMove';


function ChessBoard({ resetBoard, onBoardResetComplete, onCapture, onResetCaptured,setNotificationMessage}) {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [board, setBoard] = useState(initializeBoard());
    const [turn, setTurn] = useState('white');
    const [validMoves, setValidMoves] = useState([]);
    const [lastMove, setLastMove] = useState(null);

    const [lastMoveSource, setLastMoveSource] = useState(null);
    const [lastMoveDestination, setLastMoveDestination] = useState(null);
    const [hideLastMoveHighlights, setHideLastMoveHighlights] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const playSelectSound = useRef(new Audio(selectSound));
    const playCheckMateSound = useRef(new Audio(checkMateSound));
    const playCheckSound = useRef(new Audio(checkSound));
    

    useEffect(() => {
        if (resetBoard) {
            setBoard(initializeBoard());
            onBoardResetComplete();
            onResetCaptured();
            setTurn('white');
            setLastMoveSource(null);
            setLastMoveDestination(null);
            setGameOver(false);
        }

        if(turn === "black") {
            setTimeout(() => {
                const moveResult = randomMoveForBlack(board, lastMove, onCapture);
                setBoard(moveResult.newBoard);
                playSelectSound.current.play(); 
                setLastMoveSource(moveResult.source);        
                setLastMoveDestination(moveResult.destination);
    
                const whereIsWhiteKing = findKing(moveResult.newBoard,'white');
                if (isKingInCheck(moveResult.newBoard, whereIsWhiteKing)) {
                    if (isKingCheckmated(moveResult.newBoard, 'white')) {
                        setNotificationMessage(`white is checkmated! ${turn} wins!`);
                        playCheckMateSound.current.play();
                        setGameOver(true); 
                    } else {
                        setNotificationMessage(`white is in check!`);
                        playCheckSound.current.play();
                        setTurn('white');

                    }
                } else {
                    
                    setNotificationMessage(""); 
                    setTurn('white');
                }
    
            }, 1000); 
        }
        

    }, [resetBoard, onBoardResetComplete, onResetCaptured, setTurn, turn,board, lastMove, onCapture,setNotificationMessage]);
    

    const handleClick = (targetPieceId, rowIndex, colIndex) => {
        if (gameOver) return;

        
        const clickedPieceColor = targetPieceId && targetPieceId.includes('White') ? 'white' : 'black';

        if (!selectedPiece) {

            if (clickedPieceColor === turn) {
                // If this is the opponent's turn, hide last move highlights
                setHideLastMoveHighlights(true);

                if (targetPieceId) {
                    const pieceColor = targetPieceId.includes('White') ? 'white' : 'black';
                    if (pieceColor !== turn) return;
    
                    setSelectedPiece({ id: targetPieceId, rowIndex, colIndex });
                    const pieceType = targetPieceId.split('-')[0];
    
                    let moves = getValidMovesForPiece(board, pieceType, { id: targetPieceId, rowIndex, colIndex }, lastMove);
    
                    moves = moves.filter(move => {
                        let simulatedBoard = cloneDeep(board);
                        const { newBoard: resultingBoard } = movePiece(simulatedBoard, { id: targetPieceId, rowIndex, colIndex }, move.row, move.col);
                        const kingPosition = findKing(resultingBoard, turn);
                        return !isKingInCheck(resultingBoard, kingPosition);
                    });
    
                    setValidMoves(moves);
    
                    const newBoard = board.map(row => row.slice());
                    newBoard[rowIndex][colIndex].selected = true;
                    setBoard(newBoard);
                }


            } else {
                setHideLastMoveHighlights(false);
            }
            

        } else {
            const isValidTarget = validMoves.some(move => move.row === rowIndex && move.col === colIndex);

            if (isValidTarget) {

                setHideLastMoveHighlights(false);
                const { newBoard, lastMoveUpdate } = movePiece(board, selectedPiece, rowIndex, colIndex, onCapture, lastMove);
                //const audio = new Audio(selectSound);
                playSelectSound.current.play();
                setBoard(newBoard);
                setLastMove(lastMoveUpdate ? lastMoveUpdate : null);

                setLastMoveSource({ rowIndex: selectedPiece.rowIndex, colIndex: selectedPiece.colIndex });
                setLastMoveDestination({ rowIndex, colIndex });

                setSelectedPiece(null);
                setValidMoves([]);

                const opponentColor = turn === 'white' ? 'black' : 'white';

                const whereIsKing = findKing(newBoard,opponentColor);

                if (isKingInCheck(newBoard, whereIsKing)) {
                    if (isKingCheckmated(newBoard, opponentColor)) {
                        setNotificationMessage(`${opponentColor} is checkmated! ${turn} wins!`);
                        playCheckMateSound.current.play();
                        setGameOver(true); // Set the game as over
                    } else {
                        setNotificationMessage(`${opponentColor} is in check!`);
                        setTurn(opponentColor);
                        playCheckSound.current.play();
                    }
                    
                }else {
                    setNotificationMessage("");
                    setTurn(opponentColor);
                }

            } else if (targetPieceId && (selectedPiece.rowIndex !== rowIndex || selectedPiece.colIndex !== colIndex)) {

                if (clickedPieceColor === turn) {
                    // If the player selects another of their own pieces, keep the highlights hidden.
                    setHideLastMoveHighlights(true);
                }

                const targetPieceColor = targetPieceId.includes('White') ? 'white' : 'black';
                if (targetPieceColor !== turn) return;

                setSelectedPiece({ id: targetPieceId, rowIndex, colIndex });
                const pieceType = targetPieceId.split('-')[0];
                let moves = getValidMovesForPiece(board, pieceType, { id: targetPieceId, rowIndex, colIndex }, lastMove);

                moves = moves.filter(move => {
                    let simulatedBoard = cloneDeep(board);
                    const { newBoard: resultingBoard } = movePiece(simulatedBoard, { id: targetPieceId, rowIndex, colIndex }, move.row, move.col);
                    const kingPosition = findKing(resultingBoard, turn);
                    return !isKingInCheck(resultingBoard, kingPosition);
                });

                setValidMoves(moves);

                const newBoard = board.map(row => row.slice());
                newBoard[rowIndex][colIndex].selected = true;
                newBoard[selectedPiece.rowIndex][selectedPiece.colIndex].selected = false;
                setBoard(newBoard);
            } else {

                setHideLastMoveHighlights(false);
                setSelectedPiece(null);
                setValidMoves([]);
                const newBoard = board.map(row => row.slice());
                newBoard[selectedPiece.rowIndex][selectedPiece.colIndex].selected = false;
                setBoard(newBoard);
            }
        }
    };

    return (
        <div className="chessBoardContainer">
            <div className="chessBoard">
                {board.map((row, rowIndex) => row.map((square, colIndex) => {
                    const isMoveValid = validMoves.some(move => move.row === rowIndex && move.col === colIndex);
                    const isLastMoveSource = !hideLastMoveHighlights && lastMoveSource && lastMoveSource.rowIndex === rowIndex && lastMoveSource.colIndex === colIndex;
                    const isLastMoveDestination = !hideLastMoveHighlights && lastMoveDestination && lastMoveDestination.rowIndex === rowIndex && lastMoveDestination.colIndex === colIndex;
                                        
                    return (
                        <ChessSquare
                            key={`${rowIndex}-${colIndex}`}
                            color={square.color}
                            onClick={() => handleClick(square.pieceId, rowIndex, colIndex)}
                            pieceId={square.pieceId}
                            className={`${square.selected ? 'selectedSquare' : ''} ${isLastMoveSource ? 'lastMoveSource' : ''} ${isLastMoveDestination ? 'lastMoveDestination' : ''}`}
                            colRef={rowIndex === 7 ? String.fromCharCode('a'.charCodeAt(0) + colIndex) : null}
                            rowRef={colIndex === 7 ? (8 - rowIndex).toString() : null}
                        >
                            {square.pieceImgSrc && <img src={square.pieceImgSrc} alt={square.pieceId.split('-')[0]} className="pieceImage" />}
                            {isMoveValid && <div className="validMoveIndicator"></div>}
                        </ChessSquare>
                    );
                }))}
            </div>
        </div>
    );
}

export default ChessBoard;
