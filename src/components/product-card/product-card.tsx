import { Link } from 'react-router-dom';
import { ProductCardType } from '../../types';
import Stars from '../stars/stars';
import ButtonAddItem from '../button-add-Item/button-add-item';


type Props = {
  card: ProductCardType;
}

export default function ProductCard({ card }: Props): JSX.Element {
  const { name, type, category, description, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, rating, reviewCount } = card;
  const linkTo = `/cameras/${card.id}`;

  return (
    <div className='product-card' data-testid="card">
      <div className='product-card__img'>
        <picture>
          <source
            type={type}
            srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}
          />
          <img
            src={previewImg}
            srcSet={previewImg2x}
            width={280}
            height={240}
            alt={description}
          />
        </picture>
      </div>
      <div className='product-card__info'>
        <div className='rate product-card__rate'>
          <Stars rating={rating} />
          <p className='visually-hidden'>Рейтинг: {rating}</p>
          <p className='rate__count'><span className='visually-hidden'>Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className='product-card__title'>{category} «{name}»</p>
        <p className='product-card__price' >
          <span className='visually-hidden'>Цена:
          </span>{price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <ButtonAddItem
          productCard={card}
          variant='catalog'
        />
        <Link className='btn btn--transparent' to={linkTo}>Подробнее
        </Link>
      </div>
    </div>
  );
}
