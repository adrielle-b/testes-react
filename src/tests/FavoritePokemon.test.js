import React from 'react';
import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Favorite Pokemon', () => {
  test('Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    screen.getByText(/no favorite pokémon found/i);
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const checkboxFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFavorite);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavorite);
    screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  });
});
