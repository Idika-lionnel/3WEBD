import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  test('affiche le champ de recherche', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/rechercher un livre/i);
    expect(input).toBeInTheDocument();
  });

  test('change la valeur du champ', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/rechercher un livre/i);
    fireEvent.change(input, { target: { value: 'harry potter' } });
    expect(input.value).toBe('harry potter');
  });
});