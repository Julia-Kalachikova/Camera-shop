import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { cardsSlice } from '../../store/slice/catalog-slice';
import ModalDeleteItem from './modal-delete-item';
import { cardMock } from '../../testing-mocks';


describe('modalDeleteItem Component', () => {
  const mockStore = configureStore({
    reducer: {
      [cardsSlice.name]: cardsSlice.reducer,
    },
  });
  it('should render correct', () => {
    const mockOnClose = vi.fn();
    const mockOnHandleRemoveFromCart = vi.fn();
    const mockProductCard = cardMock;

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ModalDeleteItem onClose={mockOnClose} productCard={mockProductCard} onHandleRemoveFromCart={mockOnHandleRemoveFromCart}/>
        </BrowserRouter>
      </Provider>
    );

    const modalDeleteItemElement = screen.getByTestId('modal-delete-item');
    expect(modalDeleteItemElement).toBeInTheDocument();
  });
});

