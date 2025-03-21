import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { BrowserRouter } from 'react-router-dom';

describe('Footer Component', () => {
  it('should render correct', () => {
    const footerElement = 'footer';

    render(<Footer />, {wrapper: BrowserRouter});

    expect(screen.getByTestId(footerElement)).toBeInTheDocument();

    // Проверяем, что логотип отображается
    const logoElement = screen.getByRole('link', { name: /Переход на главную/i });
    expect(logoElement).toBeInTheDocument();

  });
});
