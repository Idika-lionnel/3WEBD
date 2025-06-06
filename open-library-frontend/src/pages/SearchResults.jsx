import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/search?q=${encodeURIComponent(query)}`);
        setBooks(response.data?.docs || []);
      } catch (err) {
        console.error('Erreur API OpenLibrary :', err);
        setError('Erreur lors de la récupération des résultats.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  if (loading) return <p style={{ padding: '1rem' }}>Chargement...</p>;
  if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // pour centrer ou space-between si tu veux étendre
      backgroundColor: '#1e1e1e',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%' // ou 70% si tu veux une marge à droite
      }}>
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Résultats pour : "{query}"</h2>
        {books.length === 0 ? (
          <p style={{ color: '#ccc' }}>Aucun résultat trouvé.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {books.slice(0, 10).map((book) => (
              <li
                key={book.key || book.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#1e1e1e',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  boxShadow: '8px 8px 16px #141414, -8px -8px 16px #282828',
                  color: 'white'
                }}
              >
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    style={{
                      width: '80px',
                      height: 'auto',
                      marginRight: '1rem',
                      borderRadius: '8px',
                      boxShadow: '2px 2px 6px rgba(0,0,0,0.4)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '80px',
                    height: '120px',
                    marginRight: '1rem',
                    borderRadius: '8px',
                    background: '#2c2c2c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#888',
                    boxShadow: 'inset 2px 2px 5px #141414, inset -2px -2px 5px #282828'
                  }}>
                    Pas d’image
                  </div>
                )}
                <div>
                  <strong style={{ fontSize: '1rem' }}>{book.title}</strong><br />
                  {book.author_name?.length > 0 && (
                    <span style={{ fontSize: '0.9rem', color: '#bbb' }}>
                      par {book.author_name.join(', ')}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchResults;