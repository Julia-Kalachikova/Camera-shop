import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { reviewMock } from '../../testing-mocks';
import Review from './review';


describe('Review Component', () => {
  it('should render correct', () => {
    const mockReview = reviewMock;

    render (<Review reviewTitle={mockReview} />, {wrapper: BrowserRouter});

    const formElement = screen.getByTestId('review');
    expect(formElement).toBeInTheDocument();
  });
});
