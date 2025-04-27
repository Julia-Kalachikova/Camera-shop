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

  // Проверяет обновление порядка сортировки
  it('should handle setSortOrder', () => {
    const previousState = sortingSlice.reducer(undefined, { type: undefined });

    const nextState = sortingSlice.reducer(previousState, setSortOrder(SortOrder.Desc));

    expect(nextState.order).toBe(SortOrder.Desc);
    expect(nextState.type).toBe(SortType.Price);// Тип сортировки не должен измениться
  });

  // Проверяет смену типа сортировки и восстановление порядка
  it('should handle setSortType and restore correct order', () => {
    let state = sortingSlice.reducer(undefined, { type: undefined });

    // Меняем порядок у Price
    state = sortingSlice.reducer(state, setSortOrder(SortOrder.Desc));

    // Переключаемся на Popular
    state = sortingSlice.reducer(state, setSortType(SortType.Popular));

    expect(state.type).toBe(SortType.Popular);
    expect(state.order).toBe(SortOrder.Desc); // У Popular по дефолту Asc

    // Меняем порядок у Popular
    state = sortingSlice.reducer(state, setSortOrder(SortOrder.Desc));

    // Возвращаемся на Price
    state = sortingSlice.reducer(state, setSortType(SortType.Price));

    expect(state.type).toBe(SortType.Price);
    expect(state.order).toBe(SortOrder.Desc); // Должен восстановиться Desc
  });
});
