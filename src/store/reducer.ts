import { combineReducers } from '@reduxjs/toolkit';
import { FeatureModule } from '../const';
import { cardsSlice } from './slice/catalog-slice';
import { productDetailsSlice } from './slice/product-details-slice';
import { filtersSlice } from './slice/filters-slice';


export const reducer = combineReducers({
  [FeatureModule.CARDS]: cardsSlice.reducer,
  [FeatureModule.PRODUCT]: productDetailsSlice.reducer,
  [FeatureModule.FILTERS]: filtersSlice.reducer,
});
