import { selectCards, selectProductLoadingReviews, selectProductReviews, selectIsLoadingCards, selectProductDetails, selectProductLoadingDetails } from './selectors';
import { FeatureModule } from '../../const';
import { StateType } from '../store-types';
import { cardMock, cardsMocks, reviewsMock } from '../../testing-mocks';


describe('selectCards', () => {
  it('должен вернуть cards из состояния', () => {

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

    const result = selectCards(mockState);

    expect(result).toEqual(cardsMocks);
  });
  it('должен вернуть isLoadingCards из состояния', () => {

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

    const result = selectIsLoadingCards(mockState);

    expect(result).toBe(true);
  });
  it('должен вернуть productDetails из состояния', () => {

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

    const result = selectProductDetails(mockState);

    expect(result).toEqual(cardMock);
  });
  it('должен вернуть productLoadingDetails из состояния', () => {

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

    const result = selectProductLoadingDetails(mockState);

    expect(result).toBe(true);
  });
  it('должен вернуть productReviews из состояния', () => {

    const mockState: StateType = {
      [FeatureModule.CARDS]: {
        cards: [],
        isLoadingCards: false,
      },
      [FeatureModule.PRODUCT]: {
        productDetails: null,
        productLoadingDetails: false,
        productReviews: reviewsMock,
        productLoadingReviews: false,
      },
    };

    const result = selectProductReviews(mockState);

    expect(result).toEqual(reviewsMock);
  });
  it('должен вернуть productLoadingReviews из состояния', () => {

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

    const result = selectProductLoadingReviews(mockState);

    expect(result).toBe(true);
  });
});


