import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navStyle = {
    backgroundColor: '#1e1e1e',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    borderBottom: '1px solid #333',
};

const linkStyle = (active) => ({
    color: active ? '#70d6ff' : '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'color 0.3s',
});

function Navbar() {
    const location = useLocation();

    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle(location.pathname === '/')}>
                Accueil
            </Link>
            <Link to="/search" style={linkStyle(location.pathname === '/search')}>
                Recherche simple
            </Link>
            <Link to="/advanced-search" style={linkStyle(location.pathname === '/advanced-search')}>
                Recherche avancée
            </Link>
        </nav>
    );
}

export default Navbar;
