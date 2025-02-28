import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType } from '../../types';
import { FeatureModule } from '../../const';
import { getProductDetailsByID } from '../api-actions';

export type ProductSliceType = {
  productDetails: ProductCardType | null;
  productLoadingDetails: boolean;
};

const initialState: ProductSliceType = {
  productDetails: null,
  productLoadingDetails: true,
};

export const productDetailsSlice = createSlice({
  name: FeatureModule.PRODUCT,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductDetailsByID.pending, (state) => {
        state.productLoadingDetails = true;
      })
      .addCase(getProductDetailsByID.fulfilled, (state, { payload }: PayloadAction<ProductCardType>) => {
        state.productDetails = payload;
        state.productLoadingDetails = false;
      })
      .addCase(getProductDetailsByID.rejected, (state) => {
        state.productLoadingDetails = false;
      });
  }
});
