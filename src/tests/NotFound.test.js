import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Not Found', () => {
  test('Teste se a página contém um heading h2 com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    const invalidaUrl = '/xablau';
    act(() => {
      history.push(invalidaUrl);
    });
    screen.getByRole('heading', { name: /page requested not found/i });
  });
  test('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    const invalidaUrl = '/xablau';
    act(() => {
      history.push(invalidaUrl);
    });
    const elementImg = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const imagemUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(elementImg).toHaveAttribute('src', imagemUrl);
  });
});
