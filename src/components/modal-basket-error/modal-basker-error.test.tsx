import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { cardsSlice } from '../../store/slice/catalog-slice';
import ModalBasketError from './modal-basket-error';


describe('modalBasketError Component', () => {
  const mockStore = configureStore({
    reducer: {
      [cardsSlice.name]: cardsSlice.reducer,
    },
  });
  it('should render correct', () => {
    const mockOnClose = vi.fn();

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ModalBasketError onClose={mockOnClose} />
        </BrowserRouter>
      </Provider>
    );

    const modalBasketErrorElement = screen.getByTestId('modal-basket-error');
    expect(modalBasketErrorElement).toBeInTheDocument();
  });
});
