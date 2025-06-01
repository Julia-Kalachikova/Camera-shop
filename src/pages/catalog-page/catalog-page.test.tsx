import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CatalogPage from './catalog-page';
import { configureStore } from '@reduxjs/toolkit';
import { cardsMocks } from '../../testing-mocks';
import { Provider } from 'react-redux';
import { FeatureModule } from '../../const';

const mockStore = configureStore({
  reducer: {
    cards: () => ({ cards: cardsMocks }),
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
      type: 'price',
      order: 'asc',
    }),
    [FeatureModule.CART]: () => ({
      items: [],
    }),
  },
});
describe('catalogPage Component', () => {
  it('should render correct', () => {

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <CatalogPage />
        </BrowserRouter>
      </Provider>
    );
    const catalogElement = screen.getByTestId('catalog');
    expect(catalogElement).toBeInTheDocument();
  });
});
