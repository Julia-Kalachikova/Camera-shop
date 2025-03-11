import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoutes } from '../const';
import { ProductCardType, ReviewType } from '../types';
import { StateType } from './store-types';
import { store } from './index-store';


export const getCardsAction = createAsyncThunk<ProductCardType[],
undefined,
{
  dispatch: typeof store.dispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'cards/getCard',
  async (_arg, {extra: api}) => {
    const response = await api.get<ProductCardType[]>(APIRoutes.Cards);
    return response?.data;
  }
);

export const getProductDetailsByID = createAsyncThunk<ProductCardType,
{cardId: string},
{
  dispatch: typeof store.dispatch;
  state: StateType;
  extra: AxiosInstance;
}
>('product/getProduct',
  async ({cardId}, {extra: api}) => {
    const response = await api.get<ProductCardType>(`${APIRoutes.Cards}/${cardId}`);
    return response?.data;
  }
);

export const getProductReviews = createAsyncThunk<
 ReviewType[],
  { cardId: string },
  {
    dispatch: typeof store.dispatch;
    state: StateType;
    extra: AxiosInstance;
  }
>('product/getProductReviews',
  async ({cardId}, { extra: api }) => {
    const response = await api.get<ReviewType[]>(`${APIRoutes.Cards}/${cardId}/reviews`);
    return response?.data;
  }
);
