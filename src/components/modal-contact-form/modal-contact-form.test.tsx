import { render, screen } from '@testing-library/react';
import ModalContactForm from './modal-contact-form';
import { BrowserRouter } from 'react-router-dom';
import { cardMock } from '../../testing-mocks';


describe('modalContactForm Component', () => {
  it('should render correct', () => {
    const mockProductCard = cardMock;
    const mockOnClose = vi.fn();

    render (<ModalContactForm productCard={mockProductCard} onClose={mockOnClose}/>, {wrapper: BrowserRouter});

    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();
  });
});
