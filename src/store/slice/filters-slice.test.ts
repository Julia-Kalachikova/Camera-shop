import { filtersSlice, resetFilters, setCategory, setLevel, setMaxPrice, setMinPrice, setPriceRange, setType } from './filters-slice';

describe('filtersSlice', () => {
  // Проверяет: должен вернуть начальное состояние по умолчанию
  it('should return the initial state', () => {
    const initialState = filtersSlice.getInitialState();
    expect(filtersSlice.reducer(undefined,{type: ''})).toEqual(initialState);
  });
  // Проверяет: должен установить диапазон цен
  it('should set the price range with setPriceRange', () => {
    const action = setPriceRange({min: 1000, max: 5000});
    const state = filtersSlice.reducer(undefined, action);

    expect(state.price.min).toBe(1000);
    expect(state.price.max).toBe(5000);
    expect(state.price.currentMin).toBe(1000);
    expect(state.price.currentMax).toBe(5000);
    expect(state.price.defaultMin).toBe(1000);
    expect(state.price.defaultMax).toBe(5000);
  });

  // Проверяет: должен установить минимальную цену
  it('should set the minimum price with setMinPrice', () => {
    const startState = filtersSlice.getInitialState();
    const action = setMinPrice(1500);
    const state = filtersSlice.reducer(startState, action);

    expect(state.price.currentMin).toBe(1500);
  });

  // Проверяет: должен установить максимальную цену
  it('should set the maximum price with setMaxPrice', () => {
    const startState = filtersSlice.getInitialState();
    const action = setMaxPrice(4500);
    const state = filtersSlice.reducer(startState, action);

    expect(state.price.currentMax).toBe(4500);
  });

  // Проверяет: должен установить категорию
  it('should set the category with setCategory', () => {
    const action = setCategory('Фотоаппарат');
    const state = filtersSlice.reducer(undefined, action);

    expect(state.category).toBe('Фотоаппарат');
  });

  // Проверяет: должен установить тип камеры
  it('should set the camera type with setType', () => {
    const action = setType({type: 'Коллекционная', value: true});
    const state = filtersSlice.reducer(undefined, action);

    expect(state.types['Коллекционная']).toBe(true);
  });

  // Проверяет: должен установить уровень камеры
  it('should set the camera level with setLevel', () => {
    const action = setLevel({level: 'Любительский', value: true});
    const state = filtersSlice.reducer(undefined, action);

    expect(state.levels['Любительский']).toBe(true);
  });

  // Проверяет: должен сбросить все фильтры, но сохранить дефолтные цены
  it('should reset filters with resetFilters', () => {
    const filledState = filtersSlice.reducer(undefined, setPriceRange({min: 1000, max: 5000}));
    const resetState = filtersSlice.reducer(filledState, resetFilters());

    expect(resetState.category).toBe('');
    expect(resetState.types['Плёночная']).toBe(false);
    expect(resetState.levels['Любительский']).toBe(false);
    expect(resetState.price.defaultMin).toBe(1000);
    expect(resetState.price.defaultMax).toBe(5000);
  });
});
