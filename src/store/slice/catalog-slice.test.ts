import { ProductCardType } from '../../types';
import { getCardsAction } from '../api-actions/api-actions';
import { cardMock } from '../testing-mocks';
import { cardsSlice } from './catalog-slice';


describe('cardsSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      cards: [],
      isLoadingCards: true,
    };

    // Вызываем редьюсер с initialState и пустым действием
    const result = cardsSlice.reducer(undefined, emptyAction);
    // Проверяем, что состояние не изменилось
    expect(result).toEqual(expectedState);
  });
  it('should set isLoadingCards to true with "getCardsAction.pending"', () => {
    const expectedState = {
      cards: [],
      isLoadingCards: true,
    };
    // Вызываем редьюсер с состоянием pending
    const result = cardsSlice.reducer(undefined, getCardsAction.pending);
    // Проверяем, что isLoadingCards стало true
    expect(result).toEqual(expectedState);
  });
  it('should set cards and isLoadingCards to false with "getCardsAction.fulfilled"', () => {
    const mockData: ProductCardType[] = [cardMock]; // Используем мок данных
    const expectedState = {
      cards: mockData,
      isLoadingCards: false,
    };
    // Вызываем редьюсер с состоянием fulfilled и моковыми данными
    const result = cardsSlice.reducer(
      undefined,
      getCardsAction.fulfilled(mockData, '', undefined)
    );
    // Проверяем, что cards заполнились данными, а isLoadingCards стало false
    expect(result).toEqual(expectedState);
  });
  it('should set isLoadingCards to false with "getCardsAction.rejected"', () => {
    const expectedState = {
      cards: [],
      isLoadingCards: false,
    };
    // Вызываем редьюсер с состоянием rejected
    const result = cardsSlice.reducer(undefined, getCardsAction.rejected);
    // Проверяем, что isLoadingCards стало false
    expect(result).toEqual(expectedState);
  });
});
