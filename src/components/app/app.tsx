import { Route, Routes } from 'react-router-dom';
import { RoutePath } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { getIsLoadingCards } from '../../store/selectors';
import { useEffect } from 'react';
import { fetchCardsAction } from '../../store/api-actions';
// import { ProductCardType } from '../../types';

// type Props = {
//   productCards: ProductCardType[];
// }

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  // const isLoading = useAppSelector(getIsLoadingCards);

  useEffect(() => {
    dispatch(fetchCardsAction());
  }, [dispatch]);

  // if(isLoading) {
  //   return <Spinner/>;
  // }
  return (
    <Routes>
      <Route
        path={RoutePath.Catalog}
        element={<CatalogPage />}
      />
      <Route
        path={RoutePath.Product}
        element={<ProductPage/>}
      />
      <Route
        path={RoutePath.Basket}
        element={<BasketPage/>}
      />
      <Route
        path={RoutePath.NOT_FOUND}
        element={<NotFoundPage/>}
      />
    </Routes>
  );
}
