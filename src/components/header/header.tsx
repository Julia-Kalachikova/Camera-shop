import { Link, useNavigate } from 'react-router-dom';
import { APIRoutes, RoutePath } from '../../const';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProductCardType } from '../../types';
import { useAppSelector } from '../../store/store-hooks';
import { selectCards } from '../../store/selectors/selectors';
// import './style.css';
import SearchList from '../search-list/search-list';

export default function Header(): JSX.Element {
  const cards = useAppSelector(selectCards); //получаем карточки из стора
  const [searchQuery, setSearchQuery] = useState(''); //заводим состояние для текста в поле поиска

  const [results, setResults] = useState<ProductCardType[]>([]);//найденные товары

  const [selectedIndex, setSelectedIndex] = useState(-1);//выбранный элемент списка
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);//открыт ли выпадающий список
  const navigate = useNavigate();//переход на страницу товара
  // searchQuery — хранит то, что пользователь ввёл в поиск.
  // results — массив найденных товаров.
  // selectedIndex — индекс выбранного товара (для навигации стрелками).
  // isDropdownOpen — открыт ли список подсказок.
  // navigate — помогает перейти на страницу товара.
  // useRef — нужен для управления фокусом и DOM-элементами.

  const dropdownRef = useRef<HTMLUListElement>(null);//Ссылка на список результатов

  const inputRef = useRef<HTMLInputElement>(null);// Ссылка на поле ввода

  // Единая функция поиска с useCallback
  const searchProducts = useCallback((query: string): ProductCardType[] => {
    if (!query || query.length < 3 || !cards.length) {
      return [];
    }
    return cards.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [cards]);

  useEffect(() => {
    // Задержка перед поиском (чтобы не делать запрос на каждый символ)
    const timer = setTimeout(() => {
      const foundProducts = searchProducts(searchQuery); // Ищем товары
      setResults(foundProducts); // Сохраняем результаты
      setIsDropdownOpen(foundProducts.length > 0); // Показываем список, если есть результаты
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
    // console.log('Navigating to:', `${APIRoutes.Cards}/${product.id}`);
    navigate(`${APIRoutes.Cards}/${product.id}`);// Переходим на страницу товара
    setSearchQuery('');// Очищаем поиск
    setIsDropdownOpen(false);// Закрываем список
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => { // Если нет результатов — ничего не делаем
    if (!results.length || !isDropdownOpen) {
      return;
    }
    const scrollToItem = (index: number) => {
      if (dropdownRef.current) {
        const itemHeight = 44; // Примерная высота одного элемента (подберите под ваш CSS)
        const visibleItems = 4; // Количество видимых элементов
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
          scrollToItem(finalIndex); // Прокрутка к элементу
          return finalIndex;
        });
        break;
      }
      case 'ArrowUp': {
        evt.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev - 1;
          const finalIndex = newIndex < 0 ? results.length - 1 : newIndex;
          scrollToItem(finalIndex); // Прокрутка к элементу
          return finalIndex;
        });
        break;
      }
      case 'Enter':
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex]);// Переходим на страницу товара
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        inputRef.current?.focus();// Закрываем список
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setSearchQuery('');// Очищаем поле
    setResults([]);// Очищаем результаты
    setIsDropdownOpen(false);// Закрываем список
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
        <div className='form-search'>
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
        {/* <Link className='header__basket-link' to='#'>
          <svg width='16' height='16' aria-hidden='true'>
            <use xlinkHref='#icon-basket'></use>
          </svg>
        </Link> */}
      </div>
    </header>
  );
}
