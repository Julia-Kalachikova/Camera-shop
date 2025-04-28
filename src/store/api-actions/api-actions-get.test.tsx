import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { APIRoutes, FeatureModule } from '../../const';
import { getCardsAction, getProductDetailsByID, getProductReviews } from './api-actions';
import { cardsSlice } from '../slice/catalog-slice';
import { cardMock, cardsMocks, reviewsMock } from '../../testing-mocks';
import { productDetailsSlice } from '../slice/product-details-slice';
import { ProductCardType, ReviewType } from '../../types';
import { filtersSlice } from '../slice/filters-slice';
import { sortingSlice } from '../slice/sorting-slice';


const mockAxios = new MockAdapter(axios);
function createTestStore() {
  return configureStore({
    reducer: {
      [FeatureModule.CARDS]: cardsSlice.reducer,
      [FeatureModule.PRODUCT]: productDetailsSlice.reducer,
      [FeatureModule.FILTERS]: filtersSlice.reducer,
      [FeatureModule.SORTING]: sortingSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: axios,
        },
      }),
  });
}
describe('Async actions', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should set isLoadingCards to true on pending', () => {

    store.dispatch({ type: getCardsAction.pending.type });

    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isLoadingCards).toBe(true);
    expect(state.cards).toEqual([]);
  });

  it('should set cards and isLoadingCards to false on fulfilled', async () => {

    const mockData = cardsMocks;
    mockAxios.onGet(APIRoutes.Cards).reply(200, mockData);

    await store.dispatch(getCardsAction());

    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isLoadingCards).toBe(false);
    expect(state.cards).toEqual(mockData);
  });

  it('should set isLoadingCards to false on rejected', async () => {

    mockAxios.onGet(APIRoutes.Cards).reply(500);

    await store.dispatch(getCardsAction());

    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isLoadingCards).toBe(false);
    expect(state.cards).toEqual([]);
  });

  it('should set productLoadingDetails to true on pending for getProductDetailsByID', () => {
    store.dispatch({ type: getProductDetailsByID.pending.type });

    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingDetails).toBe(true);
    expect(state.productDetails).toBeNull();
  });

  it('should set productDetails and productLoadingDetails to false on fulfilled for getProductDetailsByID', async () => {

    const mockData: ProductCardType = cardMock;
    mockAxios.onGet(`${APIRoutes.Cards}/1`).reply(200, mockData);

    await store.dispatch(getProductDetailsByID({ cardId: '1' }));

    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingDetails).toBe(false);
    expect(state.productDetails).toEqual(mockData);
  });

  it('should set productLoadingDetails to false on rejected for getProductDetailsByID', async () => {

    mockAxios.onGet(`${APIRoutes.Cards}/1`).reply(500);

    await store.dispatch(getProductDetailsByID({ cardId: '1' }));

    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingDetails).toBe(false);
    expect(state.productDetails).toBeNull();
  });

  it('should set productLoadingReviews to true on pending for getProductReviews', () => {

    store.dispatch({ type: getProductReviews.pending.type });

    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingReviews).toBe(true);
    expect(state.productReviews).toEqual([]);
  });

  it('should set productReviews and productLoadingReviews to false on fulfilled for getProductReviews', async () => {

    const mockData: ReviewType[] = reviewsMock;
    mockAxios.onGet(`${APIRoutes.Cards}/1/reviews`).reply(200, mockData);


    await store.dispatch(getProductReviews({ cardId: '1' }));


    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingReviews).toBe(false);
    expect(state.productReviews).toEqual(mockData);
  });

  it('should set productLoadingReviews to false on rejected for getProductReviews', async () => {

    mockAxios.onGet(`${APIRoutes.Cards}/1/reviews`).reply(500);


    await store.dispatch(getProductReviews({ cardId: '1' }));

    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingReviews).toBe(false);
    expect(state.productReviews).toEqual([]);
  });
});
