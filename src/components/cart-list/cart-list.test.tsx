import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartList from './cart-list';
import { configureStore } from '@reduxjs/toolkit';
import { FeatureModule } from '../../const';
import { Provider } from 'react-redux';
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
