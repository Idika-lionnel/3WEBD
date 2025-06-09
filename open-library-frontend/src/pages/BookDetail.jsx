import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
    const { id } = useParams();
    const location = useLocation();
    const fromPage = location.state?.from || 'search';
    const query = location.state?.query || '';
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wiki, setWiki] = useState(null);
    const [authorNames, setAuthorNames] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
                setBook(res.data);
            } catch (err) {
                console.error('Erreur récupération du livre :', err);
                setError('Impossible de charger les données du livre.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchAuthors = async () => {
            if (!book?.authors) return;

            try {
                const names = await Promise.all(
                    book.authors.map(async (a) => {
                        const key = a.author?.key || a.key;
                        if (!key) return null;
                        const res = await axios.get(`https://openlibrary.org${key}.json`);
                        return res.data?.name || key;
                    })
                );
                setAuthorNames(names.filter(Boolean));
            } catch (err) {
                console.warn('Erreur lors de la récupération des auteurs', err);
            }
        };

        fetchAuthors();
    }, [book]);

    useEffect(() => {
        const fetchWikipedia = async () => {
            if (!book?.title) return;

            try {
                const cleanedTitle = book.title
                    .replace(/[^\w\s]/gi, '')
                    .replace(/\s+/g, ' ')
                    .trim();

                const titleForSearch = encodeURIComponent(cleanedTitle);

                const res = await axios.get(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${titleForSearch}`
                );

                if (res.data?.type === 'disambiguation') {
                    console.warn('Page Wikipedia ambiguë pour :', cleanedTitle);
                    return;
                }

                setWiki(res.data);
            } catch (err) {
                console.info(`Pas d’article Wikipedia pour "${book?.title}".`, err);
            }
        };

        fetchWikipedia();
    }, [book]);

    if (loading) return <p style={{ padding: '1rem' }}>Chargement...</p>;
    if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;

    const backLink =
        fromPage === 'advanced-search'
            ? '/advanced-search'
            : `/search?q=${encodeURIComponent(query)}`;

    return (
        <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#1e1e1e', color: 'white' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Link
                    to={backLink}
                    state={location.state}
                    style={{ color: '#70d6ff', display: 'block', marginBottom: '2rem' }}
                >
                    ← Retour à la recherche
                </Link>

                <h2 style={{ marginBottom: '1rem' }}>{book.title}</h2>

                {book.covers?.length > 0 ? (
                    <img
                        src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                        alt={book.title}
                        style={{
                            display: 'block',
                            margin: '0 auto 1rem auto',
                            maxWidth: '200px',
                            borderRadius: '10px'
                        }}
                    />
                ) : (
                    <p style={{ color: '#aaa' }}>Pas de couverture disponible</p>
                )}

                {authorNames.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Auteur{authorNames.length > 1 ? 's' : ''} :</strong> {authorNames.join(', ')}
                    </div>
                )}

                {book.description && (
                    <div style={{ marginTop: '1rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                        <strong>Description :</strong><br />
                        {typeof book.description === 'string'
                            ? book.description
                            : book.description.value}
                    </div>
                )}

                {book.subjects?.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                        <strong>Sujets :</strong> {book.subjects.slice(0, 5).join(', ')}
                    </div>
                )}

                <div style={{ marginTop: '1rem' }}>
                    <strong>Date de création :</strong>{' '}
                    {book.created?.value
                        ? new Date(book.created.value).toLocaleDateString()
                        : 'Inconnue'}
                </div>

                {wiki && (
                    <div style={{ marginTop: '2rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Informations supplémentaires (Wikipedia)</h3>
                        {wiki.thumbnail?.source && (
                            <img
                                src={wiki.thumbnail.source}
                                alt="illustration Wikipedia"
                                style={{
                                    display: 'block',
                                    marginBottom: '1rem',
                                    maxWidth: '150px',
                                    borderRadius: '10px'
                                }}
                            />
                        )}
                        <p style={{ lineHeight: 1.5 }}>{wiki.extract}</p>
                        <a
                            href={wiki.content_urls.desktop.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#70d6ff' }}
                        >
                            Lire plus sur Wikipedia
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookDetail;
