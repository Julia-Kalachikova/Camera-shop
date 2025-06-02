import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { cardsSlice } from '../../store/slice/catalog-slice';
import ButtonAddItem from './button-add-item';
import { cardMock } from '../../testing-mocks';
import { cartSlice } from '../../store/slice/cart-slice';


describe('buttonAddItem Component', () => {
  const mockStore = configureStore({
    reducer: {
      [cardsSlice.name]: cardsSlice.reducer,
      [cartSlice.name]: cartSlice.reducer
    },
  });
  it('should render correct', () => {
    const mockProductCard = cardMock;
    const mockVariant = 'catalog';

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ButtonAddItem productCard={mockProductCard} variant={mockVariant}/>
        </BrowserRouter>
      </Provider>
    );

    const buttonAddItemElement = screen.getByTestId('button-add-item');
    expect(buttonAddItemElement).toBeInTheDocument();
  });
});

