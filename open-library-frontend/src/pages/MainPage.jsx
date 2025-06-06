import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MainPage() {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5050/api/recentchanges') // Appelle ton proxy local
      .then((res) => setChanges(res.data))
      .catch((err) => console.error('Erreur API OpenLibrary :', err));
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#1e1e1e',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>
          📚 Modifications récentes (Open Library)
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {changes.map((change, index) => (
            <li
              key={index}
              style={{
                background: '#2a2a2a',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '10px',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                lineHeight: '1.4'
              }}
            >
              <strong style={{ color: '#70d6ff' }}>
                {change.author?.key || 'Auteur inconnu'}
              </strong>{' '}
              – {change.comment || 'Aucune description'}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default MainPage;