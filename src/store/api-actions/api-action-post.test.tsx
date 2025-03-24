import { Action, configureStore, Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { APIRoutes, FeatureModule } from '../../const';
import { sendCallRequest } from './api-actions';
import { cardsSlice } from '../slice/catalog-slice';
import { CallRequestType } from '../../types';
import { StateType } from '../store-types';
import { productDetailsSlice } from '../slice/product-details-slice';


const mockAxios = new MockAdapter(axios);
type AppAction = Action<string>;
type AppMiddleware = Middleware<NonNullable<unknown>, StateType>;

describe('Async action: sendCallRequest', () => {
  let store: ReturnType<typeof configureStore<StateType, AppAction, AppMiddleware[]>>;
  beforeEach(() => {

    store = configureStore<StateType, AppAction, AppMiddleware[]>({
      reducer: {
        [FeatureModule.CARDS]: cardsSlice.reducer,
        [FeatureModule.PRODUCT]: productDetailsSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: axios,
          },
        }),
    });
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

    // Проверяем что запрос был сделан с правильными данными
    expect(mockAxios.history.post[0].url).toBe(APIRoutes.Orders);
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });
});
