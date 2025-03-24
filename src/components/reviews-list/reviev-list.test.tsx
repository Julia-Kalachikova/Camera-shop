import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { reviewsMock } from '../../testing-mocks';
import ReviewList from './reviews-list';


describe('reviewsList Component', () => {
  it('should render correct', () => {
    const mockReviewsList = reviewsMock;

    render (<ReviewList reviews={mockReviewsList} />, {wrapper: BrowserRouter});

    const reviewsListElement = screen.getByTestId('reviews_list');
    expect(reviewsListElement).toBeInTheDocument();
  });
});
