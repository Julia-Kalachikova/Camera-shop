import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraCategory, CameraLevel, CameraType, FeatureModule } from '../../const';

export type FilterSliceType = {
  price: {
    min: number;
    max: number;
    currentMin: number | '';
    currentMax: number | '';
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
      state.price.min = action.payload.min;
      state.price.max = action.payload.max;
      state.price.currentMin = action.payload.min;
      state.price.currentMax = action.payload.max;
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
          min: state.price.min,
          max: state.price.max,
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
} = filtersSlice.actions;
