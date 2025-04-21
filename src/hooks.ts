import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store-hooks';
import { selectCards } from './store/selectors/selectors';
import { setPriceRange } from './store/slice/filters-slice';

export default function useProductsPrice() {
  const productCards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (productCards.length > 0) {
      const prices = productCards.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
    }
  }, [productCards, dispatch]);
}


