import { combineReducers } from '@reduxjs/toolkit';
import { FeatureModule } from '../const';
import { cardsSlice } from './slice/catalog-slice';
import { productDetailsSlice } from './slice/product-details-slice';


export const reducer = combineReducers({
  [FeatureModule.CARDS]: cardsSlice.reducer,
  [FeatureModule.PRODUCT]: productDetailsSlice.reducer,
});
