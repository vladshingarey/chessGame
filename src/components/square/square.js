import React from 'react';
import '../square/square.css';

function ChessSquare({ color, colRef, rowRef, children, onClick, pieceId, className }) {

  // color: The color of the square --> either white or black
  // colRef: The col reference --> a-h
  // rowRef: the row reference --> 1-8
  // children: be able to hold pieces
  // onClick: If square is clicked

  return (
    <div className={`chessSquare ${color} ${className}`} onClick={() => onClick(pieceId)}>
      {children}
      {colRef && <span className="colRef">{colRef}</span>}
      {rowRef && <span className="rowRef">{rowRef}</span>}
    </div>
  );
}

export default ChessSquare;


