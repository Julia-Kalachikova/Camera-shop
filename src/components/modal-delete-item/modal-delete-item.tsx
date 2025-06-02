import { Link } from 'react-router-dom';

import { ProductCardType } from '../../types';
import { RoutePath } from '../../const';


type Props = {
  productCard: ProductCardType;
  onClose: () => void;
  onHandleRemoveFromCart: (id: number) => void;
}


export default function ModalDeleteItem({productCard, onClose, onHandleRemoveFromCart}: Props): JSX.Element {
  return (
    <div className="modal is-active" data-testid='modal-delete-item'>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${productCard.previewImgWebp}, ${productCard.previewImgWebp2x}`} />
                <img src={productCard.previewImg} srcSet={productCard.previewImg2x} width="140" height="120" alt={`${productCard.category}, ${productCard.name}`} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{productCard.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{productCard.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{productCard.type} {productCard.category}</li>
                <li className="basket-item__list-item">{productCard.level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={() => onHandleRemoveFromCart(productCard.id)}
            >Удалить
            </button>
            <Link
              className="btn btn--transparent modal__btn modal__btn--half-width" to={RoutePath.Catalog}
            >Продолжить покупки
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
