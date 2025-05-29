import { CameraLevel, CameraType, FeatureModule } from '../../const';
import { ProductCardType, SortOrder, SortType } from '../../types';
import { StateType } from '../store-types';


export const selectCards = (state: StateType) => state[FeatureModule.CARDS].cards;

export const selectPromoCards = (state: StateType) => state[FeatureModule.CARDS].promo;

export const selectIsLoadingCards = (state: StateType) => state[FeatureModule.CARDS].isLoadingCards;

export const selectProductDetails = (state: StateType) => state[FeatureModule.PRODUCT].productDetails;

export const selectProductLoadingDetails = (state: StateType) => state[FeatureModule.PRODUCT].productLoadingDetails;

export const selectProductReviews = (state: StateType) => state[FeatureModule.PRODUCT].productReviews;

export const selectProductLoadingReviews = (state: StateType) => state[FeatureModule.PRODUCT].productLoadingReviews;

export const selectCallRequestError = (state: StateType) => state[FeatureModule.CARDS].requestError;

export const selectSorting = (state: StateType) => state.sorting;

export const selectFilteredCards = (state: StateType): ProductCardType[] => {
  const { cards } = state[FeatureModule.CARDS];
  const { price, category, types, levels } = state.filters;

  const minPrice = price.currentMin === '' ? price.defaultMin : price.currentMin;
  const maxPrice = price.currentMax === '' ? price.defaultMax : price.currentMax;

  return cards.filter((card: ProductCardType) => {

    if (
      price.currentMin !== '' &&
      price.currentMax !== '' &&
      price.currentMin === price.currentMax &&
      card.price !== price.currentMin
    ) {
      return false;
    }

    if (card.price < minPrice || card.price > maxPrice) {
      return false;
    }

    if (category && card.category !== category) {
      return false;
    }

    const activeTypes = (Object.entries(types) as [CameraType, boolean][])
      .filter(([, isActive]) => isActive)
      .map(([type]) => type);

    if (activeTypes.length > 0 && !activeTypes.includes(card.type)) {
      return false;
    }

    const activeLevels = (Object.entries(levels) as [CameraLevel, boolean][])
      .filter(([, isActive]) => isActive)
      .map(([level]) => level);

    if (activeLevels.length > 0 && !activeLevels.includes(card.level)) {
      return false;
    }
    return true;
  });
};

export const selectProcessedCards = (state: StateType): ProductCardType[] => {
  const filteredProducts = selectFilteredCards(state);
  const { type, order } = state.sorting;

  return [...filteredProducts].sort((a, b) => {
    const valueA = type === SortType.Price ? a.price : a.rating;
    const valueB = type === SortType.Price ? b.price : b.rating;
    return order === SortOrder.Asc ? valueA - valueB : valueB - valueA;
  });
};

export const selectCartItems = (state: StateType) => state.cart.items;
export const isProductInCart = (id: number) => (state: StateType) => state.cart.items.some((item) => item.id === id);
export const selectCartTotalCount = (state: StateType) => state.cart.items.reduce((total, item) => total + item.count, 0);
export const selectCartTotalPrice = (state: StateType) => state.cart.items.reduce((total, item) => total + item.price * item.count, 0);

const selectCartDiscountPercent = (state: StateType) => {

  const allCartItems = state.cart.items;
  const promoCards = state.cards.promo;
  const filteredItems = allCartItems.filter(
    (item) => !promoCards.some((promo) => promo.id === item.id)
  );

  const totalCount = filteredItems.reduce((total, item) => total + item.count, 0);
  const totalPrice = filteredItems.reduce((total, item) => total + item.price * item.count, 0);

  let discount = 0;

  if (totalCount === 2) {
    discount = 3;
  } else if (totalCount >= 3 && totalCount <= 5) {
    discount = 5;
  } else if (totalCount >= 6 && totalCount <= 10) {
    discount = 10;
  } else if (totalCount > 10) {
    discount = 15;
  }

  if (totalPrice >= 10000 && totalPrice < 20000) {
    discount -= 1;
  } else if (totalPrice >= 20000 && totalPrice < 30000) {
    discount -= 2;
  } else if (totalPrice >= 30000) {
    discount -= 3;
  }
  return Math.max(discount, 0);
};

export const selectDiscountAmount = (state: StateType) => {
  const allCartItems = state.cart.items;
  const promoCards = state.cards.promo;

  const filteredItems = allCartItems.filter(
    (item) => !promoCards.some((promo) => promo.id === item.id)
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price * item.count, 0);
  const discountPercent = selectCartDiscountPercent(state);

  return (totalPrice * discountPercent) / 100;
};

export const selectCartFinalPrice = (state: StateType) => {
  const total = selectCartTotalPrice(state);
  const discount = selectDiscountAmount(state);
  return total - discount;
};

