import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureModule } from '../../const';
import { getCardsAction } from '../api-actions';
import { ProductCardType } from '../../types';

export type CardsSliceType = {
  cards: ProductCardType[];
  isLoadingCards: boolean;
}

const initialState: CardsSliceType = {
  cards: [],
  isLoadingCards: true,
};

export const cardsSlice = createSlice({
  name: FeatureModule.CARDS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCardsAction.pending, (state) => {
        state.isLoadingCards = true;
      })
      .addCase(getCardsAction.fulfilled, (state, { payload }: PayloadAction<ProductCardType[]>) => {
        state.cards = payload;
        state.isLoadingCards = false;
      })
      .addCase(getCardsAction.rejected, (state) => {
        state.isLoadingCards = false;
      });
  }
});
