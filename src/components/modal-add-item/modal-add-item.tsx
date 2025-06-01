import { useCallback, useEffect, useRef } from 'react';
import { ProductCardType } from '../../types';

type Props = {
  productCard: ProductCardType;
  onClose: () => void;
  onAddToCart: () => void;
}


export default function ModalAddItem({ productCard, onClose, onAddToCart }: Props): JSX.Element {
  const { category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, type, name, vendorCode, level } = productCard;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstBtnRef.current?.focus();
  }, []);

  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
      .filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
  }, []);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) {
      return;
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }

      if (evt.key === 'Tab') {
        const focusableEls = getFocusableElements(modalEl);
        if (focusableEls.length === 0) {
          return;
        }

        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (evt.shiftKey) {
          if (document.activeElement === firstEl) {
            evt.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            evt.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    modalEl.addEventListener('keydown', handleKeyDown);

    return () => {
      modalEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, getFocusableElements]);

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };


  return (
    <div
      className="modal is-active" data-testid="add-item"
      onClick={handleOverlayClick}
      role='dialog'
      aria-modal='true'
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
        >

        </div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} />
                <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt={`${category}, ${name}`} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{category} «{name}»</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} {category}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={firstBtnRef}
              onClick={onAddToCart}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
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

