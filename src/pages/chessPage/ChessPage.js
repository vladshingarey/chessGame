import React, { useState } from 'react';
import ChessBoard from '../../components/board/board'; // Import ChessBoard component
import LeftContainer from '../../components/left/leftContainer'; // Import LeftContainer component
import RightContainer from '../../components/right/rightContainer'; // Import RightContainer component
import './ChessPage.css';


const ChessPage = () => {

  const reloadPage = () => {
    window.location.reload(); 
  };
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
}; // removes all the pieces that have been captured


  return (
    <div className="ChessPage">
        <header className = "appHeader">

          <div className="headerButtons">
            <div className="titleDiv">
              <button onClick={reloadPage} className="chessButton">Chess</button>
            </div>
            <div className = "AboutDiv">
              <a href="https://en.wikipedia.org/wiki/Chess" target="_blank" rel="noopener noreferrer">
                <button className="aboutLinks">About</button>
              </a>
              <a href="https://www.chess.com/learn-how-to-play-chess" target="_blank" rel="noopener noreferrer">
                <button className="aboutLinks">Rules</button>
              </a>
              <a href="https://www.youtube.com/@GothamChess" target="_blank" rel="noopener noreferrer">
                <button className="aboutLinks">Content</button>
              </a>
            </div>

            <div className="signInDiv">
              <button className="logInButton">Log in</button>
              <button className="registerButton">/Register</button>
            </div>
          </div>

        </header>

        <main className = "appBody">
        
          <div className = "leftContainer"><LeftContainer 
            onResetBoard={handleBoardReset}
            notificationMessage={notificationMessage}
            /></div>
          <div className = "middleContainer"><ChessBoard 
            onCapture={handlePieceCapture} 
            onResetCaptured={resetCapturedPieces}
            resetBoard={resetBoard} 
            onBoardResetComplete={handleBoardResetComplete}
            turn={turn} 
            setTurn={setTurn}
            setNotificationMessage={setNotificationMessage}
            /></div>
          <div className = "rightContainer"><RightContainer captured={capturedPieces} onResetCaptured={resetCapturedPieces}/></div>
        
        </main>

        <footer className="appFooter">
          <p>© 2023 Your Chess Game. All rights reserved.</p>
        </footer>

    </div> // end of ChessPageDiv
  );

};

export default ChessPage;
