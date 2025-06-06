import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MainPage from './pages/MainPage';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' // centrer horizontalement tout le contenu
      }}
    >
      <SearchBar />
      <div style={{ width: '100%' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;