import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import CartList from './cart-list';
import { FeatureModule } from '../../const';


const mockStore = configureStore({
  reducer: {
    [FeatureModule.CART]: () => ({
      items: []
    })
  }
});

describe('cartList Component', () => {
  it('should render correct', () => {

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <CartList />
        </BrowserRouter>
      </Provider>
    );

    const cartListElement = screen.getByTestId('cart-list');
    expect(cartListElement).toBeInTheDocument();
  });
});
