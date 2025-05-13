import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { APIRoutes, RoutePath } from '../../const';
import { ProductCardType } from '../../types';
import { useAppSelector } from '../../store/store-hooks';
import { selectCards } from '../../store/selectors/selectors';
import SearchList from '../search-list/search-list';


export default function Header(): JSX.Element {
  const cards = useAppSelector(selectCards);
  const [searchQuery, setSearchQuery] = useState('');

  const [results, setResults] = useState<ProductCardType[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLUListElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const searchProducts = useCallback((query: string): ProductCardType[] => {
    if (!query || query.length < 3 || !cards.length) {
      return [];
    }
    return cards.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [cards]);

  useEffect(() => {

    const timer = setTimeout(() => {
      const foundProducts = searchProducts(searchQuery);
      setResults(foundProducts);
      setIsDropdownOpen(foundProducts.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchProducts]);

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (dropdownRef.current &&
        inputRef.current &&
        !dropdownRef.current.contains(evt.target as Node) &&
        !inputRef.current.contains(evt.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);


  const handleSelect = (product: ProductCardType) => {

    navigate(`${APIRoutes.Cards}/${product.id}`);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (!results.length || !isDropdownOpen) {
      return;
    }
    const scrollToItem = (index: number) => {
      if (dropdownRef.current) {
        const itemHeight = 44;
        const visibleItems = 4;
        const scrollPosition = index * itemHeight - (visibleItems - 1) * itemHeight / 2;

        dropdownRef.current.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }
    };

    switch (evt.key) {
      case 'ArrowDown': {
        evt.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev + 1;
          const finalIndex = newIndex >= results.length ? 0 : newIndex;
          scrollToItem(finalIndex);
          return finalIndex;
        });
        break;
      }
      case 'ArrowUp': {
        evt.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev - 1;
          const finalIndex = newIndex < 0 ? results.length - 1 : newIndex;
          scrollToItem(finalIndex);
          return finalIndex;
        });
        break;
      }
      case 'Tab': {
        evt.preventDefault();
        if (results.length === 0) {
          break;
        }
        const direction = evt.shiftKey ? -1 : 1;
        let newIndex = selectedIndex + direction;

        if (newIndex < 0) {
          newIndex = results.length - 1;
        } else if (newIndex >= results.length) {
          newIndex = 0;
        }

        setSelectedIndex(newIndex);
        break;
      }
      case 'Enter':
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        inputRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setResults([]);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  return (
    <header className='header' id='header' data-testid="header">
      <div className='container' >
        <Link className='header__logo' to={RoutePath.Catalog} aria-label='Переход на главную'>
          <svg width='100' height='36' aria-hidden='true'>
            <use xlinkHref='#icon-logo'></use>
          </svg>
        </Link>
        <nav className='main-nav header__main-nav'>
          <ul className='main-nav__list'>
            <li className='main-nav__item'>
              <Link className='main-nav__link' to={RoutePath.Catalog}>Каталог</Link>
            </li>
            <li className='main-nav__item'>
              <Link className='main-nav__link' to='#'>Гарантии</Link>
            </li>
            <li className='main-nav__item'>
              <Link className='main-nav__link' to='#'>Доставка</Link>
            </li>
            <li className='main-nav__item'>
              <Link className='main-nav__link' to='#'>О компании</Link>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${isDropdownOpen ? 'list-opened' : ''}`}>
          <form onSubmit={(evt) => evt.preventDefault()}>
            <label>
              <svg className='form-search__icon' width='16' height='16' aria-hidden='true'>
                <use xlinkHref='#icon-lens'></use>
              </svg>
              <input
                ref={inputRef}
                className='form-search__input'
                type='text'
                autoComplete='off'
                placeholder='Поиск по сайту'
                value={searchQuery}
                onChange={(evt) => {
                  setSearchQuery(evt.target.value);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  const foundProducts = searchProducts(searchQuery);
                  setIsDropdownOpen(foundProducts.length > 0);
                }}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-controls="search-results"
              />
            </label>

            {isDropdownOpen && results.length > 0 && (
              <SearchList
                results={results}
                dropdownRef={dropdownRef}
                selectedIndex={selectedIndex}
                onItemSelect={handleSelect}
                onItemHover={setSelectedIndex}
              />
            )}
          </form>
          {searchQuery && (
            <button
              className='form-search__reset'
              type='reset'
              style={searchQuery ? { display: 'block' } : { display: 'none' }}
              onClick={handleReset}
            >
              <svg width='10' height='10' aria-hidden='true'>
                <use xlinkHref='#icon-close'></use>
              </svg><span className='visually-hidden'>Сбросить поиск</span>
            </button>
          )}

        </div>
        <Link className="header__basket-link" to={RoutePath.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}
