import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraCategory, CameraLevel, CameraType, FeatureModule } from '../../const';

export type FilterSliceType = {
  price: {
    min: number;
    max: number;
    currentMin: number | '';
    currentMax: number | '';
    defaultMin: number;
    defaultMax: number;
  };
  category: CameraCategory | '';
  types: {
    [key in CameraType]: boolean;
  };
  levels: {
    [key in CameraLevel]: boolean;
  };
}

const initialState: FilterSliceType = {
  price: {
    min: 0,
    max: 0,
    currentMin: '',
    currentMax: '',
    defaultMin: 0,
    defaultMax: 0,
  },
  category: '',
  types: {
    'Коллекционная': false,
    'Моментальная': false,
    'Цифровая': false,
    'Плёночная': false,
  },
  levels: {
    'Нулевой': false,
    'Любительский': false,
    'Профессиональный': false,
  },
};

export const filtersSlice = createSlice({
  name: FeatureModule.FILTERS,
  initialState,
  reducers: {
    setPriceRange(state, action: PayloadAction<{min: number; max: number}>) {
      const { min, max } = action.payload;
      state.price.min = min;
      state.price.max = max;
      // Устанавливаем дефолтные, если они ещё не заданы
      if (state.price.defaultMin === 0 && state.price.defaultMax === 0) {
        state.price.defaultMin = min;
        state.price.defaultMax = max;
        state.price.currentMin = min;
        state.price.currentMax = max;
      }
    },
    updateFilteredPriceRange(state, action: PayloadAction<{min: number; max: number}>) {
      const { min, max } = action.payload;
      state.price.min = min;
      state.price.max = max;

      // Обновим текущие, если они вне нового диапазона
      if (state.price.currentMin !== '' && state.price.currentMin < min) {
        state.price.currentMin = min;
      }
      if (state.price.currentMax !== '' && state.price.currentMax > max) {
        state.price.currentMax = max;
      }
    },
    setMinPrice(state, action: PayloadAction<number | ''>) {
      state.price.currentMin = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | ''>) {
      state.price.currentMax = action.payload;
    },
    setCategory(state, action: PayloadAction<CameraCategory | ''>) {
      state.category = action.payload;
      if (action.payload === 'Видеокамера') {
        state.types['Плёночная'] = false;
        state.types['Моментальная'] = false;
      }
    },
    setType(state, action: PayloadAction<{type: CameraType; value: boolean}>) {
      const {type, value} = action.payload;
      if (state.category === 'Видеокамера' && (type === 'Плёночная' || type === 'Моментальная')) {
        return;
      }
      state.types[type] = value;
    },
    setLevel(state, action: PayloadAction<{level: CameraLevel; value: boolean}>) {
      const {level, value} = action.payload;
      state.levels[level] = value;
    },
    resetFilters(state) {
      return {
        ...initialState,
        price: {
          ...initialState.price,
          min: state.price.defaultMin,
          max: state.price.defaultMax,
          defaultMin: state.price.defaultMin,
          defaultMax: state.price.defaultMax,
          currentMin: state.price.defaultMin,
          currentMax: state.price.defaultMax,
        },
      };
    },
  },
});

export const {
  setPriceRange,
  setMinPrice,
  setMaxPrice,
  setCategory,
  setType,
  setLevel,
  resetFilters,
  updateFilteredPriceRange,
} = filtersSlice.actions;
