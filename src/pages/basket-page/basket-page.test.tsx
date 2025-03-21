import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BasketPage from './basket-page';

describe('basketPage Component', () => {
  it('should render correct', () => {

    render (<BasketPage />, {wrapper: BrowserRouter});

    const basketElement = screen.getByTestId('basket');
    expect(basketElement).toBeInTheDocument();
  });
});
