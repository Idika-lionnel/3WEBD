import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdvancedSearch from '../../pages/AdvancedSearch.jsx';

import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios'); // on mocke axios pour intercepter les appels réels

describe('AdvancedSearch', () => {
    it('effectue une recherche et affiche les résultats', async () => {
        // Données simulées en réponse à l'appel API
        axios.get.mockResolvedValueOnce({
            data: {
                docs: [
                    {
                        key: '/works/OL12345W',
                        title: 'Test Book',
                        author_name: ['Test Author'],
                        first_publish_year: 2021,
                        cover_i: 123,
                    },
                ],
            },
        });

        render(
            <BrowserRouter>
                <AdvancedSearch />
            </BrowserRouter>
        );

        // Simule la saisie du titre
        fireEvent.change(screen.getByPlaceholderText('Titre'), {
            target: { value: 'Test Book' },
        });

        // Clique sur le bouton "Rechercher"
        fireEvent.click(screen.getByText('Rechercher'));

        // Attendre que les résultats apparaissent dans la page
        await waitFor(() => {
            expect(screen.getByText('Test Book')).toBeInTheDocument();
            expect(screen.getByText(/par Test Author/)).toBeInTheDocument();
            expect(screen.getByText(/Publié en 2021/)).toBeInTheDocument();
        });
    });

    it('affiche un message d\'erreur en cas d\'échec de l\'API', async () => {
        // Simuler une erreur d'appel API
        axios.get.mockRejectedValueOnce(new Error('Erreur API'));

        render(
            <BrowserRouter>
                <AdvancedSearch />
            </BrowserRouter>
        );

        // Remplir un champ
        fireEvent.change(screen.getByPlaceholderText('Titre'), {
            target: { value: 'Livre impossible' },
        });

        fireEvent.click(screen.getByText('Rechercher'));

        await waitFor(() => {
            expect(screen.getByText('Erreur lors de la recherche avancée.')).toBeInTheDocument();
        });
    });
});
