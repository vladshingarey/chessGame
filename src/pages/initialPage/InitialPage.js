import { Link } from 'react-router-dom';
import '../initialPage/InitialPage.css';
import videoBackground from '../../assets/bishopBackground.mp4';

const InitialPage = () => {
  return (
    <div className="initPage">
      <div className = "overlay"></div>
      <video autoPlay loop muted className='bgVideo'>
        <source src={videoBackground}/>
      </video>
      <button className = "playButton">
        <Link to="/chessPage" className = "buttonText">Start Game</Link>
      </button>
    </div>
  );
};

export default InitialPage;

