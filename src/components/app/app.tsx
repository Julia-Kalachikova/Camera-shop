import { Route, Routes } from 'react-router-dom';
import { RoutePath } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { ProductCardType } from '../../types';

type Props = {
  productCards: ProductCardType[];
}

export default function App({productCards}: Props): JSX.Element {
  return (
    <Routes>
      <Route
        path={RoutePath.Catalog}
        element={<CatalogPage productCards={productCards}/>}
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
