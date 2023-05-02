import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', { name: /home/i });
    screen.getByRole('link', { name: /about/i });
    screen.getByRole('link', { name: /favorite pokémon/i });
  });

  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    const invalidaUrl = '/xablau';
    act(() => {
      history.push(invalidaUrl);
    });
    screen.findByText(/página solicitada não encontrada/i);
  });
});
