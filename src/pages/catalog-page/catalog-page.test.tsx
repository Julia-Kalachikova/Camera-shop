import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CatalogPage from './catalog-page';
import { configureStore } from '@reduxjs/toolkit';
import { cardsMocks } from '../../testing-mocks';
import { Provider } from 'react-redux';

const mockStore = configureStore({
  reducer: {
    cards: () => ({ cards: cardsMocks }),
  },
});

describe('catalogPage Component', () => {
  it('should render correct', () => {

    render(
      <Provider store={mockStore}>
        <CatalogPage />
      </Provider>, {wrapper: BrowserRouter});

    const catalogElement = screen.getByTestId('catalog');
    expect(catalogElement).toBeInTheDocument();
  });
});
