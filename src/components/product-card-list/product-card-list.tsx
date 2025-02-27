import { ProductCardType } from '../../types';
import ProductCard from '../product-card/product-card';


type Props = {
  productCards: ProductCardType[];
}

export default function ProductCardList({productCards}: Props): JSX.Element {
  return (
    <div className='cards catalog__cards'>
      {productCards.map((card) => <ProductCard key={card.id} card={card} />)}
    </div>
  );
}
