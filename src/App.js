import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialPage from './pages/initialPage/InitialPage';
import ChessPage from './pages/chessPage/ChessPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/chessPage" element={<ChessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
