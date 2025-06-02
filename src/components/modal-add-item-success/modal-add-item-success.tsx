import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutePath } from '../../const';


type Props = {
  onClose: () => void;
}

export default function ModalAddItemSuccess({ onClose }: Props): JSX.Element {

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
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }

      if (evt.key === 'Tab' && modalRef.current) {
        const focusableEls = getFocusableElements(modalRef.current);
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

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, getFocusableElements]);

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };
  const handleCloseRedirect = () => {
    onClose();
    navigate(RoutePath.Cart);
  };

  return (
    <div
      className="modal is-active modal--narrow" data-testid='add-item-success'
      onClick={handleOverlayClick}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              className="btn btn--transparent modal__btn"
              to={RoutePath.Catalog}
              onClick={onClose}
            >Продолжить покупки
            </Link>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={handleCloseRedirect}
            >Перейти в корзину
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
