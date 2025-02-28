import { FeatureModule } from '../const';
import { StateType } from './store-types';

export const selectCards = (state: StateType) => state[FeatureModule.CARDS].cards;

export const selectIsLoadingCards = (state: StateType) => state[FeatureModule.CARDS].isLoadingCards;

export const selectProductDetails = (state: StateType) => state[FeatureModule.PRODUCT].productDetails;

export const selectProductLoadingDetails = (state: StateType) => state[FeatureModule.PRODUCT].productLoadingDetails;
