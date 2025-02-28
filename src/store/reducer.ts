import { combineReducers } from '@reduxjs/toolkit';
import { FeatureModule } from '../const';
import { cardsSlice } from './slice/catalog-slice.ts/catalog-slice';
// import { authSlice } from './modules/auth/slice-auth';


export const reducer = combineReducers({
  [FeatureModule.CARDS]: cardsSlice.reducer,
//   [FeatureModule.QUEST]: cardFullSlice.reducer,
});
