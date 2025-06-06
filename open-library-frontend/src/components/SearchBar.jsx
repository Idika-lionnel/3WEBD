import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        backgroundColor: '#1e1e1e',
      }}
    >
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '0.6rem 1rem',
          width: '300px',
          borderRadius: '12px',
          border: 'none',
          outline: 'none',
          background: '#1e1e1e',
          color: 'white',
          boxShadow: 'inset 5px 5px 10px #141414, inset -5px -5px 10px #282828',
          fontSize: '1rem',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '0.6rem 1.2rem',
          borderRadius: '12px',
          border: 'none',
          background: '#1e1e1e',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '5px 5px 10px #141414, -5px -5px 10px #282828',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;