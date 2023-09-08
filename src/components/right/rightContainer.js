import React from 'react';
import './rightContainer.css';
import * as pieceImages from '../../assets/pieceImages/index';


const RightContainer = ({captured}) => {
  return (
    <div className="innerRightContainer">
      <div className="topContent">
        <div className="captureTitle">Black Captures:</div>
          <div className="piecesContainer">
          {captured.white.map(piece => (
            <img key={piece.id} src={pieceImages[piece.id.split('-')[0]]} alt={piece.id.split('-')[0]} className="capturedPiece" />
          ))}
        </div>
      </div>
      <div className="bottomContent">
        <div className="captureTitle">White Captures:</div>
          <div className="piecesContainer">
          {captured.black.map(piece => (
            <img key={piece.id} src={pieceImages[piece.id.split('-')[0]]} alt={piece.id.split('-')[0]} className="capturedPiece" />
          ))}
        </div>
      </div>
    </div>
  );
};



export default RightContainer;
