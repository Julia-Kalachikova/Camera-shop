import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RoutePath } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { selectIsLoadingCards } from '../../store/selectors';
import { useEffect } from 'react';
import { getCardsAction } from '../../store/api-actions';
import Spinner from '../spinner/spinner';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoadingCards);

  useEffect(() => {
    dispatch(getCardsAction());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path={RoutePath.Catalog}
          element={<CatalogPage />}
        />
        <Route
          path={RoutePath.Product}
          element={<ProductPage />}
        />
        <Route
          path={RoutePath.Basket}
          element={<BasketPage />}
        />
        <Route
          path={RoutePath.NOT_FOUND}
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  );
}
