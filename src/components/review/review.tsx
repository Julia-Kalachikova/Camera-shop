import { ReviewType } from '../../types';
import Stars from '../stars/stars';

type Props = {
  reviewTitle: ReviewType;
}
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};
export default function Review({reviewTitle}: Props): JSX.Element {
  const {userName, advantage, disadvantage, review, rating, createAt} = reviewTitle;
  const formattedDate = formatDate(createAt);
  return (
    <li className="review-card" data-testid='review'>
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{formattedDate}</time>
      </div>
      <div className="rate review-card__rate">
        <Stars rating={rating}/>
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}
