import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import ModalAddItemSuccess from './modal-add-item-success';
import { cardsSlice } from '../../store/slice/catalog-slice';


describe('modalAddItemSuccess Component', () => {
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
          <ModalAddItemSuccess onClose={mockOnClose} />
        </BrowserRouter>
      </Provider>
    );

    const addItemSuccessElement = screen.getByTestId('add-item-success');
    expect(addItemSuccessElement).toBeInTheDocument();
  });
});

