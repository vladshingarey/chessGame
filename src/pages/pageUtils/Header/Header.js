import './Header.css';

function Header() {
    const reloadPage = () => {
        window.location.reload(); 
      };
    return (
        <header className = "headerMain">

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
    
        </header>
    );
}export default Header;