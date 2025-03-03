import { ReviewType } from '../../types';
import Review from '../review/review';

type Props = {
  reviews: ReviewType[];
}

export default function ReviewList({reviews}: Props): JSX.Element {
  return (
    <section className='review-block'>
      <div className='container'>
        <div className='page-content__headed'>
          <h2 className='title title--h3'>Отзывы</h2>
          {/* <!--<button className='btn' type='button'>Оставить свой отзыв</button>--> */}
        </div>
        <ul className='review-block__list'>
          {reviews.map((review) => <Review key={review.id} reviewTitle={review} />)}
        </ul>
        <div className='review-block__buttons'>
          <button className='btn btn--purple' type='button'>Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}
