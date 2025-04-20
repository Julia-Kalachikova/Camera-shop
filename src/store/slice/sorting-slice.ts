import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureModule } from '../../const';
import { SortOrder, SortType } from '../../types';

type SortingSliceType = {
  type: SortType;
  order: SortOrder;
  lastOrder: Record<SortType, SortOrder>;
};

const initialState: SortingSliceType = {
  type: SortType.Price,
  order: SortOrder.Asc,
  lastOrder: {
    [SortType.Popular]: SortOrder.Asc,
    [SortType.Price]: SortOrder.Asc,
  }

};


export const sortingSlice = createSlice ({
  name: FeatureModule.SORTING,
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      // Сохраняем текущий порядок для предыдущего типа
      state.lastOrder[state.type] = state.order;
      // Устанавливаем новый тип и восстанавливаем его последний порядок
      state.type = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    }
  }
});

export const { setSortOrder, setSortType } = sortingSlice.actions;
