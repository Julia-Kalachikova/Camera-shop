import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { getProductDetailsByID, getProductReviews } from '../../store/api-actions/api-actions';
import { selectProductDetails, selectProductLoadingDetails, selectProductReviews } from '../../store/selectors/selectors';
import { RoutePath } from '../../const';
import Stars from '../../components/stars/stars';
import Specs from '../../components/bloc-info/specs';
import Description from '../../components/bloc-info/description';
import Spinner from '../../components/spinner/spinner';
import ReviewList from '../../components/reviews-list/reviews-list';
import ButtonAddItem from '../../components/button-add-Item/button-add-item';


export default function ProductPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('description');

  const { id: cardId } = useParams();
  const dispatch = useAppDispatch();
  const productDetails = useAppSelector(selectProductDetails);
  const isLoadingProduct = useAppSelector(selectProductLoadingDetails);
  const reviews = useAppSelector(selectProductReviews);

  useEffect(() => {
    if (cardId) {
      dispatch(getProductDetailsByID({ cardId }));
      dispatch(getProductReviews({ cardId }));
    }
  }, [cardId, dispatch]);

  if (isLoadingProduct) {
    return <Spinner />;
  }

  if (!productDetails) {
    return <div>Товар не найден</div>;
  }
  const { name, type, category, description, vendorCode, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, rating, reviewCount } = productDetails;

  return (
    <div className="wrapper" data-testid='product'>
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={RoutePath.Catalog}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type='img/webp'
                      srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`../${previewImg}`}
                      srcSet={`../${previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">«{name}»</h1>
                  <div className="rate product__rate">
                    <Stars rating={productDetails.rating} />
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>
                  <ButtonAddItem
                    productCard={productDetails}
                    variant='productPage'
                  />
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button
                        className={`tabs__control ${activeTab === 'specs' ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => setActiveTab('specs')}
                      >
                        Характеристики
                      </button>
                      <button
                        className={`tabs__control ${activeTab === 'description' ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => setActiveTab('description')}
                      >
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${activeTab === 'specs' ? 'is-active' : ''}`}>
                        <Specs
                          vendorCode={vendorCode}
                          category={category}
                          type={type}
                          level={level}
                        />
                      </div>
                      <div className={`tabs__element ${activeTab === 'description' ? 'is-active' : ''}`}>
                        <Description description={description} name={name} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </main>
      <Link
        className="up-btn"
        to="#header"
        onClick={(evt) => {
          evt.preventDefault();
          document.getElementById('header')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </Link>
      <Footer />
    </div>
  );
}
