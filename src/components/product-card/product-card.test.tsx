import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './product-card';
import { cardMock } from '../../testing-mocks';


describe('productCard Component', () => {
  it('should render correct', () => {
    const mockCard = cardMock;

    render(<ProductCard card={mockCard}/>, { wrapper: BrowserRouter });
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toBeInTheDocument();

  });
});
