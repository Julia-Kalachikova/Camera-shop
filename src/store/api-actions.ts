import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoutes } from '../const';
import { ProductCardType } from '../types';
import { StateType } from './store-types';
import { store } from './index-store';


export const fetchCardsAction = createAsyncThunk<ProductCardType[],
undefined,
{
  dispatch: typeof store.dispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'cards/get',
  async (_arg, {extra: api}) => {
    const response = await api.get<ProductCardType[]>(APIRoutes.Cards);
    return response?.data;
  }
);
