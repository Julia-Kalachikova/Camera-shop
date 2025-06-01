import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { cardsSlice } from '../../store/slice/catalog-slice';
import ModalBasketSuccess from './modal-basket-success';

describe('modalBasketSuccess Component', () => {
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
          <ModalBasketSuccess onClose={mockOnClose} />
        </BrowserRouter>
      </Provider>
    );

    const modalBasketSuccessElement = screen.getByTestId('modal-basket-success');
    expect(modalBasketSuccessElement).toBeInTheDocument();
  });
});

