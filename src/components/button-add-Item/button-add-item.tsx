import { useState } from 'react';
import ModalAddItem from '../modal-add-item/modal-add-item';
import ModalAddItemSuccess from '../modal-add-item-success/modal-add-item-success';
import { ProductCardType } from '../../types';
import { RoutePath, VariantButtonAddItem } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { addToCart } from '../../store/slice/cart-slice';
import { isProductInCart } from '../../store/selectors/selectors';
import { Link } from 'react-router-dom';


type Props = {
  productCard: ProductCardType;
  variant: VariantButtonAddItem;
}

export default function ButtonAddItem({ productCard, variant }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector(isProductInCart(productCard.id));

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };
  const handleAddToCart = () => {
    dispatch(addToCart(productCard));
    setIsModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalSuccess = () => {
    setSuccessModalOpen(false);
  };

  let button;

  if (isInCart && variant === 'catalog') {
    button = (
      <Link to={RoutePath.Cart} className="btn btn--purple-border product-card__btn product-card__btn--in-cart">
        В корзине
      </Link>
    );
  } else if (variant === 'catalog') {
    button = (
      <button
        className="btn btn--purple product-card__btn"
        type="button"
        onClick={handleBuyClick}
      >
        Купить
      </button>
    );
  } else {
    button = (
      <button
        className="btn btn--purple"
        type="button"
        onClick={handleBuyClick}
      >
        <svg width="24" height="16" aria-hidden="true">
          <use xlinkHref="#icon-add-basket"></use>
        </svg>Добавить в корзину
      </button>
    );
  }
  return (
    <div data-testid='button-add-item'>
      {button}
      {isModalOpen && (
        <ModalAddItem
          productCard={productCard}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
      {isSuccessModalOpen && (
        <ModalAddItemSuccess
          onClose={handleCloseModalSuccess}
        />
      )}
    </div>
  );
}
