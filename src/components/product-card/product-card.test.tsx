import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ProductCard from './product-card';
import { cardMock } from '../../testing-mocks';
import { FeatureModule } from '../../const';


const mockStore = configureStore({
  reducer: {
    [FeatureModule.CART]: () => ({
      items: []
    })
  }
});

describe('productCard Component', () => {
  it('should render correct', () => {
    const mockCard = cardMock;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ProductCard card={mockCard} />
        </BrowserRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId('card');
    expect(cardElement).toBeInTheDocument();

  });
});
