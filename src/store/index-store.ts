import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducer';
import { createAPI } from '../service/api';

export const api = createAPI;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

store.subscribe(() => {
  const cartState = store.getState().cart;
  localStorage.setItem('cart', JSON.stringify(cartState));
});
