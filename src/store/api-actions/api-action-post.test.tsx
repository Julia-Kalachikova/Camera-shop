import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { APIRoutes, FeatureModule } from '../../const';
import { sendCallRequest } from './api-actions';
import { cardsSlice } from '../slice/catalog-slice';
import { CallRequestType } from '../../types';
import { productDetailsSlice } from '../slice/product-details-slice';
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

    const requestData: CallRequestType = {
      camerasIds: [1],
      coupon: null,
      tel: '+79123456789',
    };

    store.dispatch(sendCallRequest(requestData));

    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isSendingRequest).toBe(true);
  });

  it('should set isSendingRequest to "false" when fulfilled', async () => {
    const requestData: CallRequestType = {
      camerasIds: [1],
      coupon: null,
      tel: '+79123456789',
    };

    mockAxios.onPost(APIRoutes.Orders).reply(200);

    await store.dispatch(sendCallRequest(requestData));

    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isSendingRequest).toBe(false);
    expect(state.requestError).toBeNull();
  });

  it('should set isSendingRequest to "false" and requestError when rejected', async () => {
    const requestData: CallRequestType = {
      camerasIds: [1],
      coupon: null,
      tel: '+79123456789',
    };

    mockAxios.onPost(APIRoutes.Orders).reply(500, { message: 'Server Error' });

    await store.dispatch(sendCallRequest(requestData));

    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isSendingRequest).toBe(false);
    expect(state.requestError).not.toBeNull();
  });

  it('should make correct API call to /orders with right data', async () => {
    const requestData: CallRequestType = {
      camerasIds: [1],
      coupon: null,
      tel: '+79123456789',
    };

    const mockApiResponse = { success: true };
    mockAxios.onPost(APIRoutes.Orders).reply(200, mockApiResponse);

    await store.dispatch(sendCallRequest(requestData));

    expect(mockAxios.history.post[0].url).toBe(APIRoutes.Orders);
    expect(JSON.parse(mockAxios.history.post[0].data as string)).toEqual(requestData);
  });
});
