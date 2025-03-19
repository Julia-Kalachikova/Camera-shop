import { ProductCardType, ReviewType } from '../../types';
import { getProductDetailsByID, getProductReviews } from '../api-actions/api-actions';
import { cardMock, reviewMock } from '../../testing-mocks';
import { productDetailsSlice } from './product-details-slice';

describe('productDetailsSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: [],
      productLoadingReviews: true,
    };
    // Вызываем редьюсер с initialState и пустым действием
    const result = productDetailsSlice.reducer(undefined, emptyAction);

    // Проверяем, что состояние не изменилось
    expect(result).toEqual(expectedState);
  });
  it('should set productLoadingDetails to true with "getProductDetailsByID.pending"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: [],
      productLoadingReviews: true,
    };
    // Вызываем редьюсер с состоянием pending
    const result = productDetailsSlice.reducer(undefined, getProductDetailsByID.pending);

    // Проверяем, что productLoadingDetails стало true
    expect(result).toEqual(expectedState);
  });
  it('should set productDetails and productLoadingDetails to false with "getProductDetailsByID.fulfilled"', () => {
    const mockData: ProductCardType = cardMock; // Используем мок данных
    const expectedState = {
      productDetails: mockData,
      productLoadingDetails: false,
      productReviews: [],
      productLoadingReviews: true,
    };
    // Вызываем редьюсер с состоянием fulfilled и моковыми данными
    const result = productDetailsSlice.reducer(
      undefined, getProductDetailsByID.fulfilled(mockData, '', { cardId: '1' }));
    // Проверяем, что productDetails заполнились данными, а productLoadingDetails стало false
    expect(result).toEqual(expectedState);
  });
  it('should set productLoadingDetails to false with "getProductDetailsByID.rejected"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: false,
      productReviews: [],
      productLoadingReviews: true,
    };
    // Вызываем редьюсер с состоянием rejected
    const result = productDetailsSlice.reducer(undefined, getProductDetailsByID.rejected);
    // Проверяем, что productLoadingDetails стало false
    expect(result).toEqual(expectedState);
  });
  it('should set productLoadingReviews to true with "getProductReviews.pending"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: [],
      productLoadingReviews: true,
    };
    // Вызываем редьюсер с состоянием pending
    const result = productDetailsSlice.reducer(undefined, getProductReviews.pending);

    // Проверяем, что productLoadingReviews стало true
    expect(result).toEqual(expectedState);
  });

  it('hould set productReviews and productLoadingReviews to false with "getProductReviews.fulfilled"', () => {
    const mockData: ReviewType[] = reviewMock;
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: mockData,
      productLoadingReviews: false,
    };
    // Вызываем редьюсер с состоянием fulfilled и моковыми данными
    const result = productDetailsSlice.reducer(
      undefined,
      getProductReviews.fulfilled(mockData, '', { cardId: '1' }));

    // Проверяем, что productReviews заполнились данными, а productLoadingReviews стало false
    expect(result).toEqual(expectedState);
  });

  it('should set productLoadingReviews to false with "getProductReviews.rejected"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: [],
      productLoadingReviews: false,
    };
    // Вызываем редьюсер с состоянием rejected
    const result = productDetailsSlice.reducer(undefined, getProductReviews.rejected);
    expect(result).toEqual(expectedState);
  });
});
