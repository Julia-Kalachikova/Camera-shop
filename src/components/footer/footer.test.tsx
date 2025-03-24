import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';


describe('Footer Component', () => {
  it('should render correct', () => {
    const footerElement = 'footer';

    render(<Footer />, {wrapper: BrowserRouter});

    expect(screen.getByTestId(footerElement)).toBeInTheDocument();

    const logoElement = screen.getByRole('link', { name: /Переход на главную/i });
    expect(logoElement).toBeInTheDocument();

  });
});
