import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('should render correctly', () => {
    render(<Header />, {wrapper: BrowserRouter});

    // Проверяем, что компонент отображается
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    // Проверяем, что логотип отображается
    const logoElement = screen.getByRole('link', { name: /Переход на главную/i });
    expect(logoElement).toBeInTheDocument();

    // Проверяем, что навигационные ссылки отображаются
    const catalogLink = screen.getByRole('link', { name: /Каталог/i });
    expect(catalogLink).toBeInTheDocument();

    const guaranteesLink = screen.getByRole('link', { name: /Гарантии/i });
    expect(guaranteesLink).toBeInTheDocument();

    const deliveryLink = screen.getByRole('link', { name: /Доставка/i });
    expect(deliveryLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /О компании/i });
    expect(aboutLink).toBeInTheDocument();
  });
});
