import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function AdvancedSearch() {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [subject, setSubject] = useState('');
    const [year, setYear] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Remet les résultats précédents si on revient de BookDetail
    useEffect(() => {
        if (location.state?.results) {
            setResults(location.state.results);
            setTitle(location.state.query?.title || '');
            setAuthor(location.state.query?.author || '');
            setSubject(location.state.query?.subject || '');
            setYear(location.state.query?.year || '');
        }
    }, [location.state]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (author) params.append('author', author);
        if (subject) params.append('subject', subject);
        if (year) params.append('first_publish_year', year);

        try {
            const response = await axios.get(`https://openlibrary.org/search.json?${params.toString()}`);
            setResults(response.data?.docs || []);
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la recherche avancée.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', color: 'white', padding: '2rem' }}>
            <form
                onSubmit={handleSearch}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                }}
            >
                <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Sujet" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Année de publication" value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle} />
                <button type="submit" style={buttonStyle}>Rechercher</button>
            </form>

            {loading && <p style={{ textAlign: 'center' }}>Chargement...</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px', margin: '0 auto' }}>
                {results.slice(0, 10).map((book) => {
                    const workId = book.key?.split('/').pop();
                    return (
                        <Link
                            to={`/book/${workId}`}
                            state={{
                                from: 'advanced-search',
                                query: { title, author, subject, year },
                                results
                            }}
                            key={book.key || book.title}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <li style={itemStyle}>
                                {book.cover_i ? (
                                    <img
                                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                        alt={book.title}
                                        style={imageStyle}
                                    />
                                ) : (
                                    <div style={placeholderStyle}>Pas d’image</div>
                                )}

                                <div>
                                    <strong style={{ fontSize: '1rem' }}>{book.title}</strong><br />
                                    {book.author_name?.length > 0 && (
                                        <span style={{ fontSize: '0.9rem', color: '#bbb' }}>
                                            par {book.author_name.join(', ')}
                                        </span>
                                    )}
                                    {book.first_publish_year && (
                                        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                                            Publié en {book.first_publish_year}
                                        </div>
                                    )}
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

// Styles
const inputStyle = {
    padding: '0.6rem 1rem',
    borderRadius: '12px',
    border: 'none',
    background: '#1e1e1e',
    color: 'white',
    boxShadow: 'inset 5px 5px 10px #141414, inset -5px -5px 10px #282828',
    fontSize: '1rem',
    width: '200px',
};

const buttonStyle = {
    padding: '0.6rem 1.2rem',
    borderRadius: '12px',
    border: 'none',
    background: '#1e1e1e',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '5px 5px 10px #141414, -5px -5px 10px #282828',
};

const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    background: '#1e1e1e',
    marginBottom: '1.5rem',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '8px 8px 16px #141414, -8px -8px 16px #282828',
    color: 'white',
};

const imageStyle = {
    width: '80px',
    height: 'auto',
    marginRight: '1rem',
    borderRadius: '8px',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
};

const placeholderStyle = {
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
    boxShadow: 'inset 2px 2px 5px #141414, inset -2px -2px 5px #282828',
};

export default AdvancedSearch;
