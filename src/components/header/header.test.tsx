import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';
import { RoutePath } from '../../const';

describe('Header Component', () => {
  it('should render correctly', () => {
    render(<Header />);

    // Проверяем, что компонент отображается
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    // Проверяем, что логотип отображается
    const logoElement = screen.getByRole('link', { name: /Переход на главную/i });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', 'index.html');

    // Проверяем, что навигационные ссылки отображаются
    const catalogLink = screen.getByRole('link', { name: /Каталог/i });
    expect(catalogLink).toBeInTheDocument();
    expect(catalogLink).toHaveAttribute('href', RoutePath.Catalog);

    const guaranteesLink = screen.getByRole('link', { name: /Гарантии/i });
    expect(guaranteesLink).toBeInTheDocument();
    expect(guaranteesLink).toHaveAttribute('href', '#');

    const deliveryLink = screen.getByRole('link', { name: /Доставка/i });
    expect(deliveryLink).toBeInTheDocument();
    expect(deliveryLink).toHaveAttribute('href', '#');

    const aboutLink = screen.getByRole('link', { name: /О компании/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '#');
  });
});
