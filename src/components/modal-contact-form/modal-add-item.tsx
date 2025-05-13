

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { sendCallRequest } from '../../store/api-actions/api-actions';
import { selectCallRequestError } from '../../store/selectors/selectors';
import { setRequestError } from '../../store/slice/catalog-slice';


import { ProductCardType } from '../../types';

type Props = {
  productCard: ProductCardType;
  onClose: () => void;
}


export default function ModalAddItem({ productCard, onClose }: Props): JSX.Element {
  const { category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, type, name, vendorCode, level } = productCard;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="modal is-active"
      onClick={handleOverlayClick}
      onKeyDown={handleEscapeKey}
      // role='dialog'
      aria-modal='true'
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
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
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
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


/* <div
  classNameName="modal is-active"
  onClick={handleOverlayClick}
  onKeyDown={handleEscapeKey}
  role='dialog'
  aria-modal='true'
  tabIndex={-1}
  ref={modalRef}
  data-testid="form"
>
  <div classNameName="modal__wrapper">
    <div
      classNameName="modal__overlay"
      onClick={handleOverlayClick}
    >
    </div>
    <div classNameName="modal__content">
      <p classNameName="title title--h4">Свяжитесь со мной</p>
      <div classNameName="basket-item basket-item--short">
        <div classNameName="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} />
            <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt={`${category}, ${name}`} />
          </picture>
        </div>
        <div classNameName="basket-item__description">
          <p classNameName="basket-item__title">{category} «{name}»</p>
          <ul classNameName="basket-item__list">
            <li classNameName="basket-item__list-item"><span classNameName="basket-item__article">Артикул:</span> <span classNameName="basket-item__number">{vendorCode}</span>
            </li>
            <li classNameName="basket-item__list-item">{type} {category}</li>
            <li classNameName="basket-item__list-item">{level} уровень</li>
          </ul>
          <p classNameName="basket-item__price"><span classNameName="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>
        </div>
      </div>
      <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}>
        <div classNameName="custom-input form-review__item">
          <label>
            <span classNameName="custom-input__label">
              Телефон
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              type="tel"
              placeholder="Введите ваш номер"
              {...register('phone', {
                required: 'Нужно указать номер',
                pattern: {
                  value: /^(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})$/,
                  message: 'Некорректный формат номера',
                },
              })}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone?.message && (
              <p classNameName="custom-input__error" >
                {errors.phone.message}
              </p>
            )}
          </label>
        </div>
        <div classNameName="modal__buttons">
          <button
            classNameName="btn btn--purple modal__btn modal__btn--fit-width"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Заказать'}
          </button>
        </div>
        <button
          classNameName="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </form>
    </div>
  </div >
</div > */

