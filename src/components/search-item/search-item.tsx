import { ProductCardType } from '../../types';
import { KeyboardEvent, MouseEvent } from 'react';

type Props = {
  product: ProductCardType;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

export default function SearchItem({ product, isSelected, onSelect, onHover }: Props): JSX.Element {
  // Inline-стили для разных состояний
  const baseStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontWeight: 600,
    color: '#333333',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isSelected ? '#e6e6ff' : 'transparent',
    margin: '2px 0',
    display: 'block',
    outline: 'none', // Убираем стандартный outline
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLLIElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      evt.stopPropagation();
      onSelect(); // Вызываем onSelect напрямую
    }
  };

  const handleClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault(); // Предотвращаем стандартное поведение
    evt.stopPropagation(); // Останавливаем всплытие
    onSelect();
  };

  return (
    <li
      style={baseStyle}
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={onHover}
      aria-selected={isSelected}
      onKeyDown={handleKeyDown}
    >
      {product.name}
    </li>
  );
}
