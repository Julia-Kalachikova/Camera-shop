import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureModule } from '../../const';

import { ProductCardPromoType, ProductCardType } from '../../types';
import { getCardsAction, getCardsPromoAction } from '../api-actions/api-actions';

export type CardsSliceType = {
  cards: ProductCardType[];
  promo: ProductCardPromoType[];
  isLoadingCards: boolean;
}

const initialState: CardsSliceType = {
  cards: [],
  promo: [],
  isLoadingCards: true,
};

export const cardsSlice = createSlice({
  name: FeatureModule.CARDS,
  initialState,
  reducers:  {},
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
      });
  }
});

