import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { RoutePath } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { getCardsAction } from '../../store/api-actions/api-actions';
import Spinner from '../spinner/spinner';
import { selectIsLoadingCards } from '../../store/selectors/selectors';
import CartPage from '../../pages/cart-page/cart-page';


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
          path={RoutePath.NOT_FOUND}
          element={<NotFoundPage />}
        />
        <Route
          path={RoutePath.Cart}
          element={<CartPage />}
        />
      </Routes>
    </>
  );
}
