import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType } from '../../types';
import { FeatureModule } from '../../const';

function loadCartFromLocalStorage(): CartSliceType | undefined {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? (JSON.parse(stored) as CartSliceType) : undefined;
  } catch {
    return undefined;
  }
}

type CartItem = ProductCardType & {
  count: number;
};

type CartSliceType = {
  items: CartItem[];
}

const initialState: CartSliceType = loadCartFromLocalStorage() || {
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
    },
    increaseCount(state, action: PayloadAction<number>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item && item.count < 9) {
        item.count += 1;
      }
    },
    decreaseCount(state, action: PayloadAction<number>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      }
    },
    setCount(state, action: PayloadAction<{ id: number; count: number}>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.id);
      if (item) {
        const newCount = Math.max(1, Math.min(9, action.payload.count));
        item.count = newCount;
      }
    }
  }
});

export const { addToCart, removeFromCart, increaseCount, decreaseCount, setCount } = cartSlice.actions;
