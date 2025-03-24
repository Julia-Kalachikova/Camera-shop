import { FeatureModule } from '../../const';
import { StateType } from '../store-types';


export const selectCards = (state: StateType) => state[FeatureModule.CARDS].cards;

export const selectIsLoadingCards = (state: StateType) => state[FeatureModule.CARDS].isLoadingCards;

export const selectProductDetails = (state: StateType) => state[FeatureModule.PRODUCT].productDetails;

export const selectProductLoadingDetails = (state: StateType) => state[FeatureModule.PRODUCT].productLoadingDetails;

export const selectProductReviews = (state: StateType) => state[FeatureModule.PRODUCT].productReviews;

export const selectProductLoadingReviews = (state: StateType) => state[FeatureModule.PRODUCT].productLoadingReviews;

export const selectCallRequestError = (state: StateType) => state[FeatureModule.CARDS].requestError;

