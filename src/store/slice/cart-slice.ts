import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType } from '../../types';
import { FeatureModule } from '../../const';

type CartItem = ProductCardType & {
  count: number;
};

type CartSliceType = {
  items: CartItem[];
}

const initialState: CartSliceType = {
  items: [],
};

export const cartSlice = createSlice({
  name: FeatureModule.CART,
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductCardType>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1});
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
