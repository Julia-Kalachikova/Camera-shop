import { cartSlice, addToCart, removeFromCart, increaseCount, decreaseCount, setCount } from './cart-slice';
import { sendOrderAction } from '../api-actions/api-actions';
import { cardMock } from '../../testing-mocks';

describe('cartSlice', () => {
  const mockProduct = cardMock;

  it('should handle initial state', () => {
    const state = cartSlice.reducer(undefined, { type: '' });
    expect(state).toEqual({
      items: [],
      isSendingOrder: false
    });
  });

  it('should handle addToCart (new item)', () => {
    const state = cartSlice.reducer(undefined, addToCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(mockProduct.id);
    expect(state.items[0].count).toBe(1);
  });

  it('should handle addToCart (existing item)', () => {
    const initialState = {
      items: [{ ...mockProduct, count: 1 }],
      isSendingOrder: false
    };
    const state = cartSlice.reducer(initialState, addToCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].count).toBe(2);
  });

  it('should handle removeFromCart', () => {
    const initialState = {
      items: [{ ...mockProduct, count: 1 }],
      isSendingOrder: false
    };
    const state = cartSlice.reducer(initialState, removeFromCart(mockProduct.id));
    expect(state.items).toHaveLength(0);
  });

  it('should handle increaseCount', () => {
    const initialState = {
      items: [{ ...mockProduct, count: 1 }],
      isSendingOrder: false
    };
    const state = cartSlice.reducer(initialState, increaseCount(mockProduct.id));
    expect(state.items[0].count).toBe(2);
  });

  it('should handle decreaseCount', () => {
    const initialState = {
      items: [{ ...mockProduct, count: 2 }],
      isSendingOrder: false
    };
    const state = cartSlice.reducer(initialState, decreaseCount(mockProduct.id));
    expect(state.items[0].count).toBe(1);
  });

  it('should handle setCount with clamping', () => {
    const initialState = {
      items: [{ ...mockProduct, count: 2 }],
      isSendingOrder: false
    };
    const state1 = cartSlice.reducer(initialState, setCount({ id: mockProduct.id, count: 5 }));
    expect(state1.items[0].count).toBe(5);

    const state2 = cartSlice.reducer(initialState, setCount({ id: mockProduct.id, count: 0 }));
    expect(state2.items[0].count).toBe(1);

    const state3 = cartSlice.reducer(initialState, setCount({ id: mockProduct.id, count: 20 }));
    expect(state3.items[0].count).toBe(9);
  });

  it('should handle sendOrderAction.pending', () => {
    const state = cartSlice.reducer(undefined, { type: sendOrderAction.pending.type });
    expect(state.isSendingOrder).toBe(true);
  });

  it('should handle sendOrderAction.fulfilled', () => {
    const initialState = {
      items: [{ ...mockProduct, count: 1 }],
      isSendingOrder: true
    };
    const state = cartSlice.reducer(initialState, { type: sendOrderAction.fulfilled.type });
    expect(state.isSendingOrder).toBe(false);
    expect(state.items).toHaveLength(0);
  });

  it('should handle sendOrderAction.rejected', () => {
    const initialState = {
      items: [{ ...mockProduct, count: 1 }],
      isSendingOrder: true
    };
    const state = cartSlice.reducer(initialState, { type: sendOrderAction.rejected.type });
    expect(state.isSendingOrder).toBe(false);
  });
});
