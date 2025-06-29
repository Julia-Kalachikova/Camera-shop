import { render, screen } from '@testing-library/react';

import Stars from './stars';
import { cardMock } from '../../testing-mocks';


describe('stars Component', () => {
  it('should render correct', () => {
    const mockRating = cardMock.rating;

    render(<Stars rating={mockRating} />);

    const starsElement = screen.getAllByTestId('stars');
    expect(starsElement).toHaveLength(5);
  });

  it('should round rating correctly', () => {
    const rating = 3.7;
    render(<Stars rating={rating} />);

    const stars = screen.getAllByTestId('stars');

    stars.slice(0, 4).forEach((star) => {
      expect(star.querySelector('use')).toHaveAttribute('xlink:href', '#icon-full-star');
    });

    expect(stars[4].querySelector('use')).toHaveAttribute('xlink:href', '#icon-star');
  });
});
