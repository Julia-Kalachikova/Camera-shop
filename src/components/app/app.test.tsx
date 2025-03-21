import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';
import { FeatureModule, RoutePath } from '../../const';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reviewsMock } from '../../testing-mocks';

describe('App Component', () => {
  it('should render CatalogPage on root route', () => {

    const mockStore = configureStore({
      reducer: {
        [FeatureModule.CARDS]: () => ({ cards: [], isLoadingCards: false }),
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[RoutePath.Catalog]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const catalogElement = screen.getByTestId('catalog');
    expect(catalogElement).toBeInTheDocument();
  });

  it('should render ProductPage on product route', () => {
    const mockStore = configureStore({
      reducer: {
        [ FeatureModule.PRODUCT]: () => ({
          productDetails: null, // Данные о продукте
          productLoadingDetails: false, // Флаг загрузки
          productReviews: reviewsMock, // Список отзывов
          productLoadingReviews: false, // Флаг загрузки отзывов
        }),
        [FeatureModule.CARDS]: () => ({ cards: [], isLoadingCards: false })
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`${RoutePath.Product}/1`]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render NotFoundPage on unknown route', () => {
    const mockStore = configureStore({
      reducer: {
        cards: () => ({ cards: [], isLoadingCards: false }),
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/unknown']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что NotFoundPage отображается
    const notFoundPage = screen.getByText(/Page not found/i);
    expect(notFoundPage).toBeInTheDocument();
  });

  it('should display spinner while loading', () => {
    // Моковый store с состоянием загрузки
    const mockStore = configureStore({
      reducer: {
        cards: () => ({ cards: [], isLoadingCards: true }),
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[RoutePath.Catalog]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что спиннер отображается
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
