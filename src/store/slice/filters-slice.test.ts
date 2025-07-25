import { CAMERA_CATEGORY, CAMERA_LEVEL, CAMERA_TYPE } from '../../const';
import { filtersSlice, resetFilters, setCategory, setLevel, setMaxPrice, setMinPrice, setPriceRange, setType } from './filters-slice';


describe('filtersSlice', () => {

  it('should return the initial state', () => {
    const initialState = filtersSlice.getInitialState();
    expect(filtersSlice.reducer(undefined,{type: ''})).toEqual(initialState);
  });

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

  it('should set the minimum price with setMinPrice', () => {
    const startState = filtersSlice.getInitialState();
    const action = setMinPrice(1500);
    const state = filtersSlice.reducer(startState, action);

    expect(state.price.currentMin).toBe(1500);
  });

  it('should set the maximum price with setMaxPrice', () => {
    const startState = filtersSlice.getInitialState();
    const action = setMaxPrice(4500);
    const state = filtersSlice.reducer(startState, action);

    expect(state.price.currentMax).toBe(4500);
  });

  it('should set the category with setCategory', () => {
    const action = setCategory(CAMERA_CATEGORY.PHOTO);
    const state = filtersSlice.reducer(undefined, action);

    expect(state.category).toBe(CAMERA_CATEGORY.PHOTO);
  });

  it('should set the camera type with setType', () => {
    const action = setType({type: CAMERA_TYPE.COLLECTIBLE, value: true});
    const state = filtersSlice.reducer(undefined, action);

    expect(state.types[CAMERA_TYPE.COLLECTIBLE]).toBe(true);
  });

  it('should set the camera level with setLevel', () => {
    const action = setLevel({level: CAMERA_LEVEL.AMATEUR, value: true});
    const state = filtersSlice.reducer(undefined, action);

    expect(state.levels[CAMERA_LEVEL.AMATEUR]).toBe(true);
  });

  it('should reset filters with resetFilters', () => {
    const filledState = filtersSlice.reducer(undefined, setPriceRange({min: 1000, max: 5000}));
    const resetState = filtersSlice.reducer(filledState, resetFilters());

    expect(resetState.category).toBe('');
    expect(resetState.types[CAMERA_TYPE.FILM]).toBe(false);
    expect(resetState.levels[CAMERA_LEVEL.AMATEUR]).toBe(false);
    expect(resetState.price.defaultMin).toBe(1000);
    expect(resetState.price.defaultMax).toBe(5000);
  });
});
