import React from 'react';
import { totalStars } from '../../const';

type Props = {
  rating: number;
}

export default function Stars({ rating }: Props): JSX.Element {
  const roundedRating = Math.round(rating);

  return (
    <React.Fragment>
      {Array.from({ length: totalStars }, (_, index) => (
        <svg key={index} width='17' height='16' aria-hidden='true' data-testid='stars'>
          <use xlinkHref={index < roundedRating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </React.Fragment>
  );
}

