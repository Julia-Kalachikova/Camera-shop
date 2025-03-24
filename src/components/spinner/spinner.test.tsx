import { render, screen } from '@testing-library/react';
import Spinner from './spinner';


describe('Spinner Component', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should have the correct structure', () => {
    render(<Spinner />);

    const rootElement = screen.getByTestId('spinner');
    expect(rootElement).toHaveClass('root');

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toHaveClass('loader');

    const spanElements = screen.getAllByRole('presentation');
    expect(spanElements).toHaveLength(5);
  });
});

