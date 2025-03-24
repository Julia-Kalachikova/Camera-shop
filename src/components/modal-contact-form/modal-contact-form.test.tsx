import { render, screen } from '@testing-library/react';
import ModalContactForm from './modal-contact-form';
import { BrowserRouter } from 'react-router-dom';
import { cardMock } from '../../testing-mocks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cardsSlice } from '../../store/slice/catalog-slice';


describe('modalContactForm Component', () => {
  const mockStore = configureStore({
    reducer: {
      [cardsSlice.name]: cardsSlice.reducer,
    },
  });
  it('should render correct', () => {
    const mockProductCard = cardMock;
    const mockOnClose = vi.fn();

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ModalContactForm productCard={mockProductCard} onClose={mockOnClose} />
        </BrowserRouter>
      </Provider>
    );

    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();
  });
});
