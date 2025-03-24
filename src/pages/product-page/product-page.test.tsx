import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { cardMock, reviewsMock } from '../../testing-mocks';
import { Provider } from 'react-redux';
import ProductPage from './product-page';
import { FeatureModule } from '../../const';

const mockStore = configureStore({
  reducer: {
    [ FeatureModule.PRODUCT]: () => ({
      productDetails: cardMock,
      productLoadingDetails: false,
      productReviews: reviewsMock,
      productLoadingReviews: false,
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
