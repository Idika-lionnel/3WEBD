import { render, screen } from '@testing-library/react';
import MainPage from '../../pages/MainPage';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');

describe('MainPage', () => {
  test('affiche les modifications récentes', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          author: { key: '/people/testuser' },
          comment: 'Created a new book.'
        }
      ]
    });

    render(<MainPage />);
    
    const item = await screen.findByText(/Created a new book/i);
    expect(item).toBeInTheDocument();
  });
});