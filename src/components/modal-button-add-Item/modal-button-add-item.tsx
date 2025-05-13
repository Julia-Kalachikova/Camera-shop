import { useState } from 'react';
import ModalAddItem from '../modal-add-item/modal-add-item';
import ModalAddItemSuccess from '../modal-add-item-success/modal-add-item-success';
import { ProductCardType } from '../../types';

type Props = {
  productCard: ProductCardType;
}

export default function ModalButtonAddItem({productCard}: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };
  const handleAddToCart = () => {
    setIsModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalSuccess = () => {
    setSuccessModalOpen(false);
  };

  return (
    <div>
      <button
        className='btn btn--purple product-card__btn'
        type='button'
        onClick={handleBuyClick}
      >
        Купить
      </button>
      {
        isModalOpen && (
          <ModalAddItem
            productCard={productCard}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )
      }
      {
        isSuccessModalOpen && (
          <ModalAddItemSuccess
            onClose={handleCloseModalSuccess}
          />
        )
      }
    </div>
  );
}
