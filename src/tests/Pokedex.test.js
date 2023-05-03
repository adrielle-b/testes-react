import React from 'react';
import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testes do componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    screen.getByRole('heading', { name: /encountered pokémon/i });
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    pokemonList.forEach((pokemon, index) => {
      screen.getByText(pokemon.name);
      const btnProximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(btnProximoPokemon);

      if (index === pokemonList.length - 1) {
        screen.getByText(pokemonList[0].name);
      }
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    screen.getByRole('button', { name: /all/i });

    const pokemonTypes = [];
    pokemonList.forEach(({ type }) => {
      if (!pokemonTypes.includes(type)) {
        pokemonTypes.push(type);
      }
    });

    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType).toHaveLength(pokemonTypes.length);
    btnType.forEach((button, index) => {
      userEvent.click(button);

      pokemonList.filter(({ type }) => type === pokemonTypes[index])
        .forEach((pokemonFilter) => {
          screen.getByText(pokemonFilter.name);
          const btnProximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
          userEvent.click(btnProximoPokemon);
          screen.getByRole('button', { name: /all/i });
        });
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();

    const btnEletric = screen.getByRole('button', { name: /electric/i });
    const btnProximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnEletric);
    expect(btnProximoPokemon).toBeDisabled();

    userEvent.click(btnAll);
    pokemonList.forEach((pokemon) => {
      screen.getByText(pokemon.name);
      userEvent.click(btnProximoPokemon);
    });
  });
});
