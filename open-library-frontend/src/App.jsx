import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar.jsx';
import MainPage from './pages/MainPage.jsx';

function App() {
  return (
    <div>
      <SearchBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* Ajoute d'autres routes ici plus tard */}
      </Routes>
    </div>
  );
}

export default App;