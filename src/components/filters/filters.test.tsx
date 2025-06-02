import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Filters from './filters';
import { cardsMocks } from '../../testing-mocks';


describe('Filters Component', () => {
  it('should render correctly', () => {
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
        })
      },
    });
    render(
      <Provider store={mockStore}>
        <Filters />
      </Provider>
    );
    expect(screen.getByTestId('filters')).toBeInTheDocument();
  });
});
