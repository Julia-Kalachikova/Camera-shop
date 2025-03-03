import { useState } from 'react';
import { ReviewType } from '../../types';
import Review from '../review/review';

type Props = {
  reviews: ReviewType[];
}

const getSortedList = (reviews: ReviewType[]) => {
  const sortedReviews = [...reviews].sort((a, b) => {
    const firstDate = new Date(a.createAt);
    const secondDate = new Date(b.createAt);
    return secondDate.getTime() - firstDate.getTime();
  });
  return sortedReviews;
};

export default function ReviewList({ reviews }: Props): JSX.Element {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);
  const sortedReviews = getSortedList(reviews);
  const handleShowMoreReviews = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 3);
  };
  const visibleReviews = sortedReviews.slice(0, visibleReviewsCount);
  const hasMoreReviews = visibleReviews.length < sortedReviews.length;


  return (
    <section className='review-block'>
      <div className='container'>
        <div className='page-content__headed'>
          <h2 className='title title--h3'>Отзывы</h2>
          {/* <!--<button className='btn' type='button'>Оставить свой отзыв</button>--> */}
        </div>
        <ul className='review-block__list'>
          {visibleReviews.map((review) => <Review key={review.id} reviewTitle={review} />)}
        </ul>
        {hasMoreReviews && (
          <div className='review-block__buttons'>
            <button
              className='btn btn--purple'
              type='button'
              onClick={handleShowMoreReviews}
            >
              Показать больше отзывов
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
