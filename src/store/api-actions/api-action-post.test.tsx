import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { APIRoutes, FeatureModule } from '../../const';
import { sendOrderAction } from './api-actions';
import { cardsSlice } from '../slice/catalog-slice';
import { ProductOrderType } from '../../types';
import { productDetailsSlice } from '../slice/product-details-slice';
import { filtersSlice } from '../slice/filters-slice';
import { sortingSlice } from '../slice/sorting-slice';
import { cartSlice } from '../slice/cart-slice';


const mockAxios = new MockAdapter(axios);
function createTestStore() {
  return configureStore({
    reducer: {
      [FeatureModule.CARDS]: cardsSlice.reducer,
      [FeatureModule.PRODUCT]: productDetailsSlice.reducer,
      [FeatureModule.FILTERS]: filtersSlice.reducer,
      [FeatureModule.SORTING]: sortingSlice.reducer,
      [FeatureModule.CART]: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: axios,
        },
      }),
  });
}
describe('Async action: sendCallRequest', () => {
  let store: ReturnType<typeof createTestStore>;
  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should set isSendingRequest to "true" when pending', () => {
    mockAxios.onPost(APIRoutes.Orders).reply(200);

    const order: ProductOrderType = {
      camerasIds: [1],
      coupon: null,
    };

    store.dispatch(sendOrderAction(order));

    const state = store.getState()[FeatureModule.CART];
    expect(state.isSendingOrder).toBe(true);
  });

  it('should set isSendingRequest to "false" when fulfilled', async () => {
    const order: ProductOrderType = {
      camerasIds: [1],
      coupon: null,
    };

    mockAxios.onPost(APIRoutes.Orders).reply(200);

    await store.dispatch(sendOrderAction(order));

    const state = store.getState()[FeatureModule.CART];
    expect(state.isSendingOrder).toBe(false);
  });

  it('should set isSendingRequest to "false" and requestError when rejected', async () => {
    const requestData: ProductOrderType = {
      camerasIds: [1],
      coupon: null,
    };

    mockAxios.onPost(APIRoutes.Orders).reply(500, { message: 'Server Error' });

    await store.dispatch(sendOrderAction(requestData));

    const state = store.getState()[FeatureModule.CART];
    expect(state.isSendingOrder).toBe(false);
  });

  it('should make correct API call to /orders with right data', async () => {
    const order: ProductOrderType = {
      camerasIds: [1],
      coupon: null,
    };

    const mockApiResponse = { success: true };
    mockAxios.onPost(APIRoutes.Orders).reply(200, mockApiResponse);

    await store.dispatch(sendOrderAction(order));

    expect(mockAxios.history.post[0].url).toBe(APIRoutes.Orders);
    expect(JSON.parse(mockAxios.history.post[0].data as string)).toEqual(order);
  });
});
