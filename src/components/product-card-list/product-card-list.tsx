import { ProductCardType } from '../../types';
import ProductCard from '../product-card/product-card';


type Props = {
  productCards: ProductCardType[];
}

export default function ProductCardList({productCards}: Props): JSX.Element {
  return (
    <div className='cards catalog__cards' data-testid='card_list'>
      {productCards.map((card) => <ProductCard key={card.id} card={card} />)}
    </div>
  );
}
