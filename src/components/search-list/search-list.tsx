
import SearchItem from '../search-item/search-item';
import { ProductCardType } from '../../types';
import { useEffect } from 'react';

type Props = {
  results: ProductCardType[];
  dropdownRef: React.RefObject<HTMLUListElement>;
  selectedIndex: number;
  onItemSelect: (product: ProductCardType) => void;
  onItemHover: (index: number) => void;
}

export default function SearchList({
  results,
  dropdownRef,
  selectedIndex,
  onItemSelect,
  onItemHover
}: Props): JSX.Element {

  useEffect(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const selectedItem = dropdownRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex, dropdownRef]);

  return (
    <ul
      className="form-search__select-list scroller"
      data-testid='search-list'
      ref={dropdownRef}
      role="listbox"
    >
      {results.map((product, index) => (
        <SearchItem
          key={product.id}
          product={product}
          isSelected={selectedIndex === index}
          onSelect={() => onItemSelect(product)}
          onHover={() => onItemHover(index)}
        />
      ))}
    </ul>
  );
}
