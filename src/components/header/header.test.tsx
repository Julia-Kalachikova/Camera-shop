import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';
import { Provider } from 'react-redux';
import { FeatureModule } from '../../const';
import { configureStore } from '@reduxjs/toolkit';


describe('Header Component', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({
      reducer: {
        [FeatureModule.CARDS]: () => ({
          cards: [],
          isLoadingCards: false
        }),
      },
    });

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const logoElement = screen.getByRole('link', { name: /Переход на главную/i });
    expect(logoElement).toBeInTheDocument();

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
