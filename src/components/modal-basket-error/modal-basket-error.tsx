import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../const';


type Props = {
  onClose: () => void;
}

export default function ModalBasketError({ onClose }: Props): JSX.Element {

  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    firstBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const handleCloseRedirect = () => {
    onClose();
    navigate(RoutePath.Catalog);
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="modal is-active modal--narrow" data-testid='modal-basket-error'
      onClick={handleOverlayClick}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Ошибка при оформлении заказа. Попробуйте ещё раз</p>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={handleClose}
              type="button"
            >Вернуться в корзину
            </button>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={handleCloseRedirect}
              type="button"
            >Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleClose}
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
