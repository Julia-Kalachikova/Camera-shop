import { ProductCardType } from '../../types';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

type Props = {
  productCard: ProductCardType;
  onClose: () => void;
}

type FormValues = {
  phone: string;
}


export default function ModalContactForm({ productCard, onClose }: Props): JSX.Element {
  const { category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, type, name, vendorCode, level } = productCard;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>(
    { mode: 'onChange'});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {

    setIsSubmitting(true);
    try {
      const formattedPhone = data.phone.replace(/\D/g, '').replace(/^8/, '+7');
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Отправка данных:', { phone: formattedPhone });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Ваш запрос успешно отправлен!');
      onClose();
    } catch (error) {
      toast.error('Произошла ошибка при отправке запроса.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
      role='dialog'
      aria-modal='true'
      tabIndex={-1}
      ref={modalRef}
      data-testid="form"
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={handleOverlayClick}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
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
          <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">
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
                  <>
                    <p className="custom-input__error" >
                      {errors.phone.message}
                    </p>
                    {console.log('Элемент с ошибкой отрендерился')}
                  </>
                )}
              </label>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Заказать'}
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
          </form>
        </div>
      </div >
    </div >
  );
}
