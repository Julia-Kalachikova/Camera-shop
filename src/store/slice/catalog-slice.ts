import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureModule } from '../../const';

import { ProductCardPromoType, ProductCardType } from '../../types';
import { getCardsAction, getCardsPromoAction, sendCallRequest } from '../api-actions/api-actions';

export type CardsSliceType = {
  cards: ProductCardType[];
  promo: ProductCardPromoType[];
  isLoadingCards: boolean;
  isSendingRequest: boolean;
  requestError: string | null;
}

const initialState: CardsSliceType = {
  cards: [],
  promo: [],
  isLoadingCards: true,
  isSendingRequest: false,
  requestError: null,
};

export const cardsSlice = createSlice({
  name: FeatureModule.CARDS,
  initialState,
  reducers: {
    setRequestError: (state, action: PayloadAction<string | null>) => {
      state.requestError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardsAction.pending, (state) => {
        state.isLoadingCards = true;
      })
      .addCase(getCardsAction.fulfilled, (state, { payload }: PayloadAction<ProductCardType[]>) => {
        state.cards = payload;
        state.isLoadingCards = false;
      })
      .addCase(getCardsPromoAction.fulfilled, (state, { payload }: PayloadAction<ProductCardPromoType[]>) => {
        state.promo = payload;
      })
      .addCase(getCardsAction.rejected, (state) => {
        state.isLoadingCards = false;
      })
      .addCase(sendCallRequest.pending, (state) => {
        state.isSendingRequest = true;
        state.requestError = null;
      })
      .addCase(sendCallRequest.fulfilled, (state) => {
        state.isSendingRequest = false;
      })
      .addCase(sendCallRequest.rejected, (state, action) => {
        state.isSendingRequest = false;
        state.requestError = action.error.message || 'Ошибка при отправке запроса';
      });
  }
});

export const { setRequestError } = cardsSlice.actions;
