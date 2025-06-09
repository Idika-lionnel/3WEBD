import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Navbar from './components/naviguation/Navbar.jsx';
import MainPage from './pages/MainPage';
import SearchResults from './pages/SearchResults';
import AdvancedSearch from './pages/AdvancedSearch';
import BookDetail from './pages/BookDetail';

function App() {
    const location = useLocation();
    const showSearchBar = location.pathname === '/search';

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#1e1e1e',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Navbar />
            {showSearchBar && <SearchBar />}

            <div style={{ width: '100%' }}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/advanced-search" element={<AdvancedSearch />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
