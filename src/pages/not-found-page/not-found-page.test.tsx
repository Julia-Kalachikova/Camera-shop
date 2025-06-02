import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NotFoundPage from './not-found-page';


describe('notFoundPage Component', () => {
  it('should render correct', () => {

    render (<NotFoundPage />, {wrapper: BrowserRouter});

    const notFoundElement = screen.getByTestId('not_found');
    expect(notFoundElement).toBeInTheDocument();
  });
});
