import React, { useState } from 'react';
import './leftContainer.css'; // You can create and style this CSS file

const LeftContainer = (props) => {
  const [textBoxValue, setTextBoxValue] = useState('');
  const [recentMessages, setRecentMessages] = useState([]);

  const handleTextBoxChange = (event) => {
    setTextBoxValue(event.target.value);
  };

  const handleTextBoxEnter = (event) => {
    if (event.key === 'Enter') {
      if (recentMessages.length >= 16) {
        recentMessages.shift();
      }
      setRecentMessages([...recentMessages, textBoxValue]);
      setTextBoxValue('');
    }
  };

  return (
    <div className="innerLeftContainer">
      <div className="newGameDiv">
        <button className = "playAgainButton" onClick={props.onResetBoard}>Play Again</button>
      </div> 

      <div className={`notificationCenter ${props.notificationMessage ? 'hasMessage' : ''}`}>
  <p className="notifText">{props.notificationMessage}</p>
</div>

      <div className="recentMessages"> 
        {recentMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

      <input
        type="text"
        placeholder=" Chat..."
        value={textBoxValue}
        onChange={handleTextBoxChange}
        onKeyDown={handleTextBoxEnter}
        className="inputBox"
      />
      
    </div>
  );
};

export default LeftContainer;
