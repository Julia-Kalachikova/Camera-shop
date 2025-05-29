import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CartList from '../../components/cart-list/cart-list';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { selectCartFinalPrice, selectCartTotalCount, selectCartTotalPrice, selectDiscountAmount } from '../../store/selectors/selectors';
import { useEffect } from 'react';
import { getCardsPromoAction } from '../../store/api-actions/api-actions';

export default function CartPage(): JSX.Element {
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);
  const cartTotalCount = useAppSelector(selectCartTotalCount);
  const discount = useAppSelector(selectDiscountAmount);
  const finalPrice = useAppSelector(selectCartFinalPrice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCardsPromoAction());
  }, [dispatch]);


  return (
    <div className="wrapper">
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
                  <Link className="breadcrumbs__link" to="catalog.html">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              < CartList />
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{cartTotalPrice.toLocaleString('ru-RU')} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className= {discount > 0
                      ? 'basket__summary-value basket__summary-value--bonus'
                      : 'basket__summary-value'}
                    >
                      {discount > 0 ? `${discount.toLocaleString('ru-RU')} ₽` : '0 ₽'}
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">{finalPrice.toLocaleString('ru-RU')} ₽</span>
                  </p>
                  <button
                    className="btn btn--purple"
                    type="submit"
                    disabled={cartTotalCount === 0}
                  >Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div >
      </main >
      <Footer />
    </div >
  );
}
