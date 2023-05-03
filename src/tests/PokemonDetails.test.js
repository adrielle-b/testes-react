import React from 'react';
import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testes do componente Pokedex', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    screen.getByRole('heading', { name: /pikachu details/i });

    expect(linkMoreDetails).not.toBeInTheDocument();

    screen.getByRole('heading', { name: /summary/i });
    screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    screen.getByRole('heading', { name: /game locations of pikachu/i });

    const elementImg = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(elementImg).toHaveLength(2);

    const { foundAt } = pokemonList[0];
    foundAt.forEach(({ location, map }, index) => {
      screen.getByText(location);
      expect(elementImg[index]).toHaveAttribute('src', map);
    });
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    screen.getByText(/pokémon favoritado\?/i);
    const checkboxFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFavorite);

    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavorite);
    screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    userEvent.click(linkMoreDetails);
    userEvent.click(checkboxFavorite);
    userEvent.click(linkFavorite);
    screen.findByText(/no favorite pokémon found/i);
  });
});
