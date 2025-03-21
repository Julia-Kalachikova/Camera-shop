import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { APIRoutes, FeatureModule } from '../../const';
import { getCardsAction } from './api-actions';
import { cardsSlice } from '../slice/catalog-slice';
import { cardsMocks } from '../../testing-mocks';

// Создаем мок для axios
const mockAxios = new MockAdapter(axios);

describe('Async actions', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Создаем store с cardsSlice
    store = configureStore({
      reducer: {
        [FeatureModule.CARDS]: cardsSlice.reducer, // Подключаем slice
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
});
