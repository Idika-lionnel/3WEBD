import React, { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Recherche rapide lancée : ${query}`);
      // Tu pourras rediriger vers une page de résultats ici
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ padding: '1rem', backgroundColor: '#f4f4f4' }}>
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '250px' }}
      />
      <button type="submit" style={{ padding: '0.5rem', marginLeft: '10px' }}>Rechercher</button>
    </form>
  );
}

export default SearchBar;