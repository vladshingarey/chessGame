import React, { useState } from 'react';
import ChessBoard from '../../components/board/board'; // Import ChessBoard component
import LeftContainer from '../../components/left/leftContainer'; // Import LeftContainer component
import RightContainer from '../../components/right/rightContainer'; // Import RightContainer component
import './ChessPage.css';
import Header from '../pageUtils/Header/Header';
import Footer from '../pageUtils/Footer/Footer';

const ChessPage = () => {

  const [turn, setTurn] = useState('white'); // sets turn to white
  const [resetBoard, setResetBoard] = useState(false); // tracks to reset the board
  const [notificationMessage, setNotificationMessage] = useState("");

  const [capturedPieces, setCapturedPieces] = useState({
    black: [],
    white: []
  }); // keeps track of pieces that are captured by both colors
  
  const handlePieceCapture = (capturedPiece) => {
    setCapturedPieces(prevState => ({
        ...prevState,
        [capturedPiece.color]: [...prevState[capturedPiece.color], capturedPiece]
    }));
  };  // handles piece capture on the board

  

const handleBoardReset = () => {
  setResetBoard(true); // directly set it to true
  setTurn('white'); // ensure the turn is set to white
  setNotificationMessage("");
}; // handles board reset


const handleBoardResetComplete = () => {
  setResetBoard(false); // set it back to false
};

const resetCapturedPieces = () => {
  setCapturedPieces({
    black: [],
    white: []
  });
};

  return (
    <div className="ChessPage">

      <Header/>

      <main className = "appBody">
        <div className = "leftContainer">
          <LeftContainer onResetBoard={handleBoardReset} notificationMessage={notificationMessage}/>
        </div>

        <div className = "middleContainer">
          <ChessBoard 
            onCapture={handlePieceCapture} 
            onResetCaptured={resetCapturedPieces}
            resetBoard={resetBoard} 
            onBoardResetComplete={handleBoardResetComplete}
            turn={turn} 
            setTurn={setTurn}
            setNotificationMessage={setNotificationMessage}
          />
        </div>

        <div className = "rightContainer">
          <RightContainer 
            captured={capturedPieces} 
            onResetCaptured={resetCapturedPieces}
          />
        </div>
      </main>
      
      <Footer/>

    </div> // end of ChessPageDiv
  );

};

export default ChessPage;
