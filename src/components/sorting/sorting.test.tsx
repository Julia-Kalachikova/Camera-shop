import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Sorting from './sorting';
import { cardsMocks } from '../../testing-mocks';
import { SortOrder, SortType } from '../../types';


describe('Sorting Component', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({
      reducer: {
        cards: () => ({ cards: cardsMocks }),
        sorting: () => ({
          type: SortType.Price,
          order: SortOrder.Asc,
          lastOrder: {
            [SortType.Popular]: SortOrder.Asc,
            [SortType.Price]: SortOrder.Asc,
          }})
      },
    });
    render(
      <Provider store={mockStore}>
        <Sorting />
      </Provider>
    );

    expect(screen.getByTestId('sorting')).toBeInTheDocument();
  });
});
