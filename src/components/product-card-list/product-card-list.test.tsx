import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCardList from './product-card-list';
import { cardsMocks } from '../../testing-mocks';
import { Provider } from 'react-redux';
import { FeatureModule } from '../../const';
import { configureStore } from '@reduxjs/toolkit';

const mockStore = configureStore({
  reducer: {
    [FeatureModule.CART]: () => ({
      items: [],
    })
  }
});

describe('productCardList Component', () => {
  it('should render correct', () => {
    const mocksCardsList = cardsMocks;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ProductCardList productCards={mocksCardsList}/>
        </BrowserRouter>
      </Provider>
    );


    const cardsListElement = screen.getByTestId('card_list');
    expect(cardsListElement).toBeInTheDocument();
  });
});
