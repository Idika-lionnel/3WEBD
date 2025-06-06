const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5050;

app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (err) {
    console.error('Erreur API OpenLibrary (search):', err.message);
    res.status(500).json({ error: 'Erreur serveur OpenLibrary' });
  }
});

app.get('/api/recentchanges', async (req, res) => {
  try {
    const response = await axios.get('https://openlibrary.org/recentchanges.json?limit=10');
    res.json(response.data);
  } catch (err) {
    console.error('Erreur API OpenLibrary (recentchanges):', err.message);
    res.status(500).json({ error: 'Erreur serveur OpenLibrary' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy en cours sur http://localhost:${PORT}`);
});