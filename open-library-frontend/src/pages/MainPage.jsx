import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MainPage() {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    axios.get('https://openlibrary.org/recentchanges.json?limit=10')
      .then((res) => setChanges(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main style={{ padding: '1rem' }}>
      <h2>📚 Modifications récentes (Open Library)</h2>
      <ul>
        {changes.map((change, index) => (
          <li key={index}>
            <strong>{change.author?.key || 'Auteur inconnu'}</strong> – {change.comment}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default MainPage;