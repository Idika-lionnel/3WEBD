// tests/pages/BookDetail.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import BookDetail from '../../pages/BookDetail';

vi.mock('axios');

describe('BookDetail', () => {
    const mockBook = {
        title: 'Test Book Title',
        covers: [123],
        authors: [{ author: { key: '/authors/OL12345A' } }],
        description: 'Une description de test.',
        subjects: ['Sujet1', 'Sujet2'],
        created: { value: '2000-01-01T00:00:00.000000' },
    };

    const mockAuthor = { name: 'Test Author' };

    const mockWiki = {
        extract: 'Ceci est un extrait Wikipedia.',
        content_urls: {
            desktop: { page: 'https://fr.wikipedia.org/wiki/Test_Book' },
        },
        thumbnail: {
            source: 'https://upload.wikimedia.org/test.jpg'
        }
    };

    beforeEach(() => {
        axios.get.mockImplementation((url) => {
            if (url.includes('/works/')) return Promise.resolve({ data: mockBook });
            if (url.includes('/authors/')) return Promise.resolve({ data: mockAuthor });
            if (url.includes('wikipedia')) return Promise.resolve({ data: mockWiki });
            return Promise.reject(new Error('Unknown URL'));
        });
    });

    it('affiche les détails du livre et Wikipedia', async () => {
        render(
            <MemoryRouter initialEntries={["/book/OL12345W"]}>
                <Routes>
                    <Route path="/book/:id" element={<BookDetail />} />
                </Routes>
            </MemoryRouter>
        );

        // Attendre que le titre apparaisse
        await waitFor(() => {
            expect(screen.getByText('Test Book Title')).toBeInTheDocument();
            expect(screen.getByText(/Test Author/)).toBeInTheDocument();
            expect(screen.getByText(/Une description de test/)).toBeInTheDocument();
            expect(screen.getByText(/Sujet1, Sujet2/)).toBeInTheDocument();
            expect(screen.getByText('01/01/2000')).toBeInTheDocument();
            expect(screen.getByText(/Ceci est un extrait Wikipedia/)).toBeInTheDocument();
            expect(screen.getByText(/Lire plus sur Wikipedia/)).toBeInTheDocument();
        });
    });
});
