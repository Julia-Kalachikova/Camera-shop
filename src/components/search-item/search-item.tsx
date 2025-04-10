import { ProductCardType } from '../../types';
import { KeyboardEvent, MouseEvent } from 'react';

type Props = {
  product: ProductCardType;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

export default function SearchItem({ product, isSelected, onSelect, onHover }: Props): JSX.Element {

  const handleKeyDown = (evt: KeyboardEvent<HTMLLIElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      onSelect(); // Вызываем onSelect напрямую
    }
  };

  const handleClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault(); // Предотвращаем стандартное поведение
    onSelect();
  };

  return (
    <li
      className="form-search__select-item"
      style={{backgroundColor: isSelected ? '#f4f4fc' : 'transparent',}}
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={onHover}
      aria-selected={isSelected}
      onKeyDown={handleKeyDown}
      role="option"
    >
      {product.name}
    </li>
  );
}
