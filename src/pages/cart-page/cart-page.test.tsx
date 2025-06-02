import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { FeatureModule } from '../../const';
import CartPage from './cart-page';


const mockStore = configureStore({
  reducer: {
    [FeatureModule.CARDS]: () => ({
      promo: [],
    }),
    [FeatureModule.CART]: () => ({
      items: [],
      isSendingOrder: false,
      totalPrice: 0,
      totalCount: 0,
      discountAmount: 0,
      finalPrice: 0
    })
  }
});

describe('cartPage Component', () => {
  it('should render correct', () => {

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );


    const cartPageElement = screen.getByTestId('cart');
    expect(cartPageElement).toBeInTheDocument();
  });
});
