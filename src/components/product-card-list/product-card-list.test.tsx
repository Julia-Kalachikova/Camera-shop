import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ProductCardList from './product-card-list';
import { cardsMocks } from '../../testing-mocks';
import { FeatureModule } from '../../const';


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
