// Tu peux centraliser ici les appels vers l’API Open Library

import axios from 'axios';

export const searchBooks = async (query) => {
  const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
  return response.data;
};

export const getRecentChanges = async () => {
  const response = await axios.get('https://openlibrary.org/recentchanges.json?limit=10');
  return response.data;
};