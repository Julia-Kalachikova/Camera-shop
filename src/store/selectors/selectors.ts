import { CameraLevel, CameraType, FeatureModule } from '../../const';
import { ProductCardType, SortOrder, SortType } from '../../types';
import { StateType } from '../store-types';


export const selectCards = (state: StateType) => state[FeatureModule.CARDS].cards;

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

  return cards.filter((card: ProductCardType) => {

    const minPrice = price.currentMin === '' ? price.min : Number(price.currentMin);
    const maxPrice = price.currentMax === '' ? price.max : Number(price.currentMax);

    if (price.currentMin !== '' &&
      price.currentMax !== '' &&
      price.currentMin === price.currentMax &&
      card.price !== Number(price.currentMin)) {
      return false;
    }

    // Фильтрация по цене
    if (card.price < minPrice || card.price > maxPrice) {
      return false;
    }

    // Фильтрация по категории
    if (category && card.category !== category) {
      return false;
    }

    // Фильтрация по типу
    const activeTypes = (Object.entries(types) as [CameraType, boolean][])
      .filter(([, isActive]) => isActive)
      .map(([type]) => type);

    if (activeTypes.length > 0 && !activeTypes.includes(card.type)) {
      return false;
    }

    // Фильтрация по уровню
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
