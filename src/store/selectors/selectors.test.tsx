import { selectCards, selectProductLoadingReviews, selectProductReviews, selectIsLoadingCards, selectProductDetails, selectProductLoadingDetails } from './selectors';
import { FeatureModule } from '../../const';
import { StateType } from '../store-types';
import { cardMock, cardsMocks, reviewMock } from '../../testing-mocks';


describe('selectCards', () => {
  it('должен вернуть cards из состояния', () => {
    // Моковое состояние
    const mockState: StateType = {
      [FeatureModule.CARDS]: {
        cards: cardsMocks,
        isLoadingCards: false,
      },
      [FeatureModule.PRODUCT]: {
        productDetails: null,
        productLoadingDetails: false,
        productReviews: [],
        productLoadingReviews: false,
      },
    };

    // Вызываем селектор с моковым состоянием
    const result = selectCards(mockState);

    // Проверяем, что селектор вернул правильные данные
    expect(result).toEqual(cardsMocks);
  });
  it('должен вернуть isLoadingCards из состояния', () => {
    // Моковое состояние
    const mockState: StateType = {
      [FeatureModule.CARDS]: {
        cards: [],
        isLoadingCards: true,
      },
      [FeatureModule.PRODUCT]: {
        productDetails: null,
        productLoadingDetails: false,
        productReviews: [],
        productLoadingReviews: false,
      },
    };

    // Вызываем селектор с моковым состоянием
    const result = selectIsLoadingCards(mockState);

    // Проверяем, что селектор вернул правильные данные
    expect(result).toBe(true);
  });
  it('должен вернуть productDetails из состояния', () => {
    // Моковое состояние
    const mockState: StateType = {
      [FeatureModule.CARDS]: {
        cards: [],
        isLoadingCards: false,
      },
      [FeatureModule.PRODUCT]: {
        productDetails: cardMock,
        productLoadingDetails: false,
        productReviews: [],
        productLoadingReviews: false,
      },
    };

    // Вызываем селектор с моковым состоянием
    const result = selectProductDetails(mockState);

    // Проверяем, что селектор вернул правильные данные
    expect(result).toEqual(cardMock);
  });
  it('должен вернуть productLoadingDetails из состояния', () => {
    // Моковое состояние
    const mockState: StateType = {
      [FeatureModule.CARDS]: {
        cards: [],
        isLoadingCards: false,
      },
      [FeatureModule.PRODUCT]: {
        productDetails: null,
        productLoadingDetails: true,
        productReviews: [],
        productLoadingReviews: false,
      },
    };

    // Вызываем селектор с моковым состоянием
    const result = selectProductLoadingDetails(mockState);

    // Проверяем, что селектор вернул правильные данные
    expect(result).toBe(true);
  });
  it('должен вернуть productReviews из состояния', () => {
    // Моковое состояние
    const mockState: StateType = {
      [FeatureModule.CARDS]: {
        cards: [],
        isLoadingCards: false,
      },
      [FeatureModule.PRODUCT]: {
        productDetails: null,
        productLoadingDetails: false,
        productReviews: reviewMock,
        productLoadingReviews: false,
      },
    };

    // Вызываем селектор с моковым состоянием
    const result = selectProductReviews(mockState);

    // Проверяем, что селектор вернул правильные данные
    expect(result).toEqual(reviewMock);
  });
  it('должен вернуть productLoadingReviews из состояния', () => {
    // Моковое состояние
    const mockState: StateType = {
      [FeatureModule.CARDS]: {
        cards: [],
        isLoadingCards: false,
      },
      [FeatureModule.PRODUCT]: {
        productDetails: null,
        productLoadingDetails: false,
        productReviews: [],
        productLoadingReviews: true,
      },
    };

    // Вызываем селектор с моковым состоянием
    const result = selectProductLoadingReviews(mockState);

    // Проверяем, что селектор вернул правильные данные
    expect(result).toBe(true);
  });
});


