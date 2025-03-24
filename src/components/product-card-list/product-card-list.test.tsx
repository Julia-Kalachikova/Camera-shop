import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCardList from './product-card-list';
import { cardsMocks } from '../../testing-mocks';


describe('productCardList Component', () => {
  it('should render correct', () => {
    const mocksCardsList = cardsMocks;

    render (<ProductCardList productCards={mocksCardsList}/>, {wrapper: BrowserRouter});

    const cardsListElement = screen.getByTestId('card_list');
    expect(cardsListElement).toBeInTheDocument();
  });
});
