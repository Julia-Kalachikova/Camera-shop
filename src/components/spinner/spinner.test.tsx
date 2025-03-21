import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner Component', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    // Проверяем, что компонент отображается
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should have the correct structure', () => {
    render(<Spinner />);
    // Проверяем, что корневой элемент имеет класс "root"
    const rootElement = screen.getByTestId('spinner');
    expect(rootElement).toHaveClass('root');

    // Проверяем, что внутри есть элемент с классом "loader"
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toHaveClass('loader');

    // Проверяем, что внутри "loader" есть 5 элементов "span"
    const spanElements = screen.getAllByRole('presentation');
    expect(spanElements).toHaveLength(5);
  });
});

