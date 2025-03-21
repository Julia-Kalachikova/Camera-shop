import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { cardMock, reviewsMock } from '../../testing-mocks';
import { Provider } from 'react-redux';
import ProductPage from './product-page';
import { FeatureModule } from '../../const';

// Моковый редьюсер
const mockStore = configureStore({
  reducer: {
    [ FeatureModule.PRODUCT]: () => ({
      productDetails: cardMock, // Данные о продукте
      productLoadingDetails: false, // Флаг загрузки
      productReviews: reviewsMock, // Список отзывов
      productLoadingReviews: false, // Флаг загрузки отзывов
    }),
  },
});

describe('productPage Component', () => {
  it('should render correct', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );


    const productPageElement = screen.getByTestId('product');
    expect(productPageElement).toBeInTheDocument();
  });
});
