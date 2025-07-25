import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import App from './app';
import { FeatureModule, RoutePath } from '../../const';
import { reviewsMock } from '../../testing-mocks';
import { SortOrder, SortType } from '../../types';


describe('App Component', () => {
  it('should render CatalogPage on root route', () => {
    const mockStore = configureStore({
      reducer: {
        [FeatureModule.CARDS]: () => ({
          cards: [],
          promo: [],
          isLoadingCards: false,

        }),
        filters: () => ({
          price: {
            currentMin: '',
            currentMax: '',
            defaultMin: 0,
            defaultMax: 100000,
          },
          category: '',
          types: [],
          levels: [],
        }),
        sorting: () => ({
          type: SortType.Price,
          order: SortOrder.Asc,
        }),
        [FeatureModule.CART]: () => ({
          items: [],
        })
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
        [FeatureModule.PRODUCT]: () => ({
          productDetails: null,
          productLoadingDetails: false,
          productReviews: reviewsMock,
          productLoadingReviews: false,
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

    const notFoundPage = screen.getByText(/Page not found/i);
    expect(notFoundPage).toBeInTheDocument();
  });

  it('should display spinner while loading', () => {

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

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should render CartPage on root route', () => {
    const mockStore = configureStore({
      reducer: {
        [FeatureModule.CART]: () => ({
          items: [],
          promo: [],
          isSendingOrder: false
        }),
        [FeatureModule.CARDS]: () => ({
          cards: [],
          promo: [],
          isLoadingCards: false
        }),
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[RoutePath.Cart]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const cartElement = screen.getByTestId('cart');
    expect(cartElement).toBeInTheDocument();
  });
});
