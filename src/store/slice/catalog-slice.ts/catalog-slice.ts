import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType } from '../../../types';
import { FeatureModule } from '../../../const';
import { fetchCardsAction } from '../../api-actions';

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
      .addCase(fetchCardsAction.pending, (state) => {
        state.isLoadingCards = true;
      })
      .addCase(fetchCardsAction.fulfilled, (state, { payload }: PayloadAction<ProductCardType[]>) => {
        state.cards = payload;
        state.isLoadingCards = false;
      })
      .addCase(fetchCardsAction.rejected, (state) => {
        state.isLoadingCards = false;
      });
  }
});
