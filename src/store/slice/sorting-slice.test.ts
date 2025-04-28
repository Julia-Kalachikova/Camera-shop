import { SortOrder, SortType } from '../../types';
import { setSortOrder, setSortType, sortingSlice } from './sorting-slice';

describe('sortingSlice', () => {
  it('should handle setSortOrder', () => {
    expect(sortingSlice.reducer(undefined, { type: undefined })).toEqual({
      type: SortType.Price,
      order: SortOrder.Asc,
      lastOrder: {
        [SortType.Popular]: SortOrder.Asc,
        [SortType.Price]: SortOrder.Asc,
      },
    });
  });

  it('should handle setSortOrder', () => {
    const previousState = sortingSlice.reducer(undefined, { type: undefined });

    const nextState = sortingSlice.reducer(previousState, setSortOrder(SortOrder.Desc));

    expect(nextState.order).toBe(SortOrder.Desc);
    expect(nextState.type).toBe(SortType.Price);
  });

  it('should handle setSortType and restore correct order', () => {
    let state = sortingSlice.reducer(undefined, { type: undefined });

    state = sortingSlice.reducer(state, setSortOrder(SortOrder.Desc));

    state = sortingSlice.reducer(state, setSortType(SortType.Popular));

    expect(state.type).toBe(SortType.Popular);
    expect(state.order).toBe(SortOrder.Desc);

    state = sortingSlice.reducer(state, setSortOrder(SortOrder.Desc));

    state = sortingSlice.reducer(state, setSortType(SortType.Price));

    expect(state.type).toBe(SortType.Price);
    expect(state.order).toBe(SortOrder.Desc);
  });
});
