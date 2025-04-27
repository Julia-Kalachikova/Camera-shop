import { ProductCardType, ReviewType } from '../../types';
import { getProductDetailsByID, getProductReviews } from '../api-actions/api-actions';
import { cardMock, reviewsMock } from '../../testing-mocks';
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

    const result = productDetailsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set productLoadingDetails to true with "getProductDetailsByID.pending"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: [],
      productLoadingReviews: true,
    };

    const result = productDetailsSlice.reducer(undefined, getProductDetailsByID.pending);

    expect(result).toEqual(expectedState);
  });
  it('should set productDetails and productLoadingDetails to false with "getProductDetailsByID.fulfilled"', () => {
    const mockData: ProductCardType = cardMock;
    const expectedState = {
      productDetails: mockData,
      productLoadingDetails: false,
      productReviews: [],
      productLoadingReviews: true,
    };

    const result = productDetailsSlice.reducer(
      undefined, getProductDetailsByID.fulfilled(mockData, '', { cardId: '1' }));

    expect(result).toEqual(expectedState);
  });
  it('should set productLoadingDetails to false with "getProductDetailsByID.rejected"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: false,
      productReviews: [],
      productLoadingReviews: true,
    };

    const result = productDetailsSlice.reducer(undefined, getProductDetailsByID.rejected);

    expect(result).toEqual(expectedState);
  });
  it('should set productLoadingReviews to true with "getProductReviews.pending"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: [],
      productLoadingReviews: true,
    };

    const result = productDetailsSlice.reducer(undefined, getProductReviews.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set productReviews and productLoadingReviews to false with "getProductReviews.fulfilled"', () => {
    const mockData: ReviewType[] = reviewsMock;
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: mockData,
      productLoadingReviews: false,
    };

    const result = productDetailsSlice.reducer(
      undefined,
      getProductReviews.fulfilled(mockData, '', { cardId: '1' }));

    expect(result).toEqual(expectedState);
  });

  it('should set productLoadingReviews to false with "getProductReviews.rejected"', () => {
    const expectedState = {
      productDetails: null,
      productLoadingDetails: true,
      productReviews: [],
      productLoadingReviews: false,
    };

    const result = productDetailsSlice.reducer(undefined, getProductReviews.rejected);
    expect(result).toEqual(expectedState);
  });
});
