import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { cardMock } from '../../testing-mocks';
import { cardsSlice } from '../../store/slice/catalog-slice';
import ModalAddItem from './modal-add-item';


describe('modalAddItem Component', () => {
  const mockStore = configureStore({
    reducer: {
      [cardsSlice.name]: cardsSlice.reducer,
    },
  });
  it('should render correct', () => {
    const mockProductCard = cardMock;
    const mockOnClose = vi.fn();
    const mockOnAddToCart = vi.fn();

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ModalAddItem productCard={mockProductCard} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />
        </BrowserRouter>
      </Provider>
    );

    const addItemElement = screen.getByTestId('add-item');
    expect(addItemElement).toBeInTheDocument();
  });
});
