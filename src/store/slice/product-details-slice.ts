import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType, ReviewType } from '../../types';
import { FeatureModule } from '../../const';
import { getProductDetailsByID, getProductReviews } from '../api-actions/api-actions';


export type ProductSliceType = {
  productDetails: ProductCardType | null;
  productLoadingDetails: boolean;
  productReviews: ReviewType[];
  productLoadingReviews: boolean;
};

const initialState: ProductSliceType = {
  productDetails: null,
  productLoadingDetails: true,
  productReviews: [],
  productLoadingReviews: true,
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
      })
      .addCase(getProductReviews.pending, (state) => {
        state.productLoadingReviews = true;
      })
      .addCase(getProductReviews.fulfilled, (state, { payload }: PayloadAction<ReviewType[]>) => {
        state.productReviews = payload;
        state.productLoadingReviews = false;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.productLoadingReviews = false;
      });
  }
});
