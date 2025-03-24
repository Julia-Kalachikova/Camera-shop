import { configureStore, Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { APIRoutes, FeatureModule } from '../../const';
import { getCardsAction, getProductDetailsByID, getProductReviews } from './api-actions';
import { cardsSlice } from '../slice/catalog-slice';
import { cardsMocks } from '../../testing-mocks';
import { StateType } from '../store-types';
import { productDetailsSlice } from '../slice/product-details-slice';

// Создаем мок для axios
const mockAxios = new MockAdapter(axios);
type AppAction = ReturnType<typeof getCardsAction> | ReturnType<typeof getProductDetailsByID> | ReturnType<typeof getProductReviews>;
type AppMiddleware = Middleware<{}, StateType>;
describe('Async actions', () => {
  let store: ReturnType<typeof configureStore<StateType, AppAction, AppMiddleware[]>>;

  beforeEach(() => {
    // Создаем store с cardsSlice
    store = configureStore<StateType, AppAction, AppMiddleware[]>({
      reducer: {
        [FeatureModule.CARDS]: cardsSlice.reducer,
        [FeatureModule.PRODUCT]: productDetailsSlice.reducer,// Подключаем slice
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: axios, // Передаем axios как extraArgument
          },
        }),
    });
  });

  it('should set isLoadingCards to true on pending', () => {
    // Вызываем pending состояние
    store.dispatch({ type: getCardsAction.pending.type });

    // Проверяем состояние
    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isLoadingCards).toBe(true);
    expect(state.cards).toEqual([]);
  });

  it('should set cards and isLoadingCards to false on fulfilled', async () => {
    // Мокаем успешный ответ от API
    const mockData = cardsMocks;
    mockAxios.onGet(APIRoutes.Cards).reply(200, mockData);

    // Вызываем action
    await store.dispatch(getCardsAction());

    // Проверяем состояние
    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isLoadingCards).toBe(false);
    expect(state.cards).toEqual(mockData);
  });

  it('should set isLoadingCards to false on rejected', async () => {
    // Мокаем ошибку от API
    mockAxios.onGet(APIRoutes.Cards).reply(500);

    // Вызываем action
    await store.dispatch(getCardsAction());

    // Проверяем состояние
    const state = store.getState()[FeatureModule.CARDS];
    expect(state.isLoadingCards).toBe(false);
    expect(state.cards).toEqual([]);
  });

  it('should set productLoadingDetails to true on pending for getProductDetailsByID', () => {
    // Вызываем pending состояние
    store.dispatch({ type: getProductDetailsByID.pending.type });

    // Проверяем состояние
    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingDetails).toBe(true);
    expect(state.productDetails).toBeNull();
  });

  it('should set productDetails and productLoadingDetails to false on fulfilled for getProductDetailsByID', async () => {
    // Мокаем успешный ответ от API
    const mockData: ProductCardType = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
    };
    mockAxios.onGet(`${APIRoutes.Cards}/1`).reply(200, mockData);

    // Вызываем action
    await store.dispatch(getProductDetailsByID({ cardId: '1' }));

    // Проверяем состояние
    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingDetails).toBe(false);
    expect(state.productDetails).toEqual(mockData);
  });

  it('should set productLoadingDetails to false on rejected for getProductDetailsByID', async () => {
    // Мокаем ошибку от API
    mockAxios.onGet(`${APIRoutes.Cards}/1`).reply(500);

    // Вызываем action
    await store.dispatch(getProductDetailsByID({ cardId: '1' }));

    // Проверяем состояние
    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingDetails).toBe(false);
    expect(state.productDetails).toBeNull();
  });

  it('should set productLoadingReviews to true on pending for getProductReviews', () => {
    // Вызываем pending состояние
    store.dispatch({ type: getProductReviews.pending.type });

    // Проверяем состояние
    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingReviews).toBe(true);
    expect(state.productReviews).toEqual([]);
  });

  it('should set productReviews and productLoadingReviews to false on fulfilled for getProductReviews', async () => {
    // Мокаем успешный ответ от API
    const mockData: ReviewType[] = [
      { id: '1', text: 'Great product!', rating: 5 },
      { id: '2', text: 'Not bad', rating: 4 },
    ];
    mockAxios.onGet(`${APIRoutes.Cards}/1/reviews`).reply(200, mockData);

    // Вызываем action
    await store.dispatch(getProductReviews({ cardId: '1' }));

    // Проверяем состояние
    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingReviews).toBe(false);
    expect(state.productReviews).toEqual(mockData);
  });

  it('should set productLoadingReviews to false on rejected for getProductReviews', async () => {
    // Мокаем ошибку от API
    mockAxios.onGet(`${APIRoutes.Cards}/1/reviews`).reply(500);

    // Вызываем action
    await store.dispatch(getProductReviews({ cardId: '1' }));

    // Проверяем состояние
    const state = store.getState()[FeatureModule.PRODUCT];
    expect(state.productLoadingReviews).toBe(false);
    expect(state.productReviews).toEqual([]);
  });
});
