import { ProductCardType } from '../../types';
import { getCardsAction } from '../api-actions/api-actions';
import { cardMock } from '../../testing-mocks';
import { cardsSlice } from './catalog-slice';


describe('cardsSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      cards: [],
      promo: [],
      isLoadingCards: true
    };

    const result = cardsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set isLoadingCards to true with "getCardsAction.pending"', () => {
    const expectedState = {
      cards: [],
      promo: [],
      isLoadingCards: true,
    };

    const result = cardsSlice.reducer(undefined, getCardsAction.pending);

    expect(result).toEqual(expectedState);
  });
  it('should set cards and isLoadingCards to false with "getCardsAction.fulfilled"', () => {
    const mockData: ProductCardType[] = [cardMock];
    const expectedState = {
      cards: mockData,
      promo: [],
      isLoadingCards: false,
    };

    const result = cardsSlice.reducer(
      undefined,
      getCardsAction.fulfilled(mockData, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });
  it('should set isLoadingCards to false with "getCardsAction.rejected"', () => {
    const expectedState = {
      cards: [],
      promo: [],
      isLoadingCards: false,
    };

    const result = cardsSlice.reducer(undefined, getCardsAction.rejected);

    expect(result).toEqual(expectedState);
  });
});


