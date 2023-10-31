import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import BrokersPage from './components/BrokersPage';
import StocksPage from './components/StocksPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/settings" element={<SettingsPage/>} />
          <Route exact path="/brokers" element={<BrokersPage/>} />
          <Route exact path="/stocks" element={<StocksPage/>} />
          <Route exact path="/" element={<HomePage/>} />
        </Routes>
      </Router>
  );
}

export default App;
