import React, { useEffect } from 'react';
import { selectCards, selectFilteredCards} from '../../store/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { StateType } from '../../store/store-types';
import { resetFilters, setCategory, setLevel, setMaxPrice, setMinPrice, setPriceRange, setType } from '../../store/slice/filters-slice';
import FilterCheckboxItem from '../filter-checkbox-item/filter-checkbox-item';

export default function Filters(): JSX.Element {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: StateType) => state.filters);
  const productCards = useAppSelector(selectCards);
  const filteredCards = useAppSelector(selectFilteredCards);

  // При загрузке устанавливаем диапазон цен
  useEffect(() => {
    if (productCards.length > 0) {
      const prices = productCards.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
    }
  }, [productCards, dispatch]);

  useEffect(() => {
    if (filteredCards.length > 0) {
      const price = filteredCards.map((card) => card.price);
      const minPrice = Math.min(...price);
      const maxPrice = Math.max(...price);

      dispatch(setPriceRange({
        min: minPrice,
        max: maxPrice
      }));
    }
  }, [filteredCards, dispatch]);


  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;
    let value: number | '' = inputValue === '' ? '' : Number(inputValue);

    // Если введенное значение больше текущего максимума, обновляем максимум
    if (value !== '') {
      // Проверка на минимальную цену
      if (value < filters.price.min) {
        value = filters.price.min;
      }

      if (filters.price.currentMax !== '' && value > filters.price.currentMax) {
        dispatch(setMaxPrice(value));
      }
    }

    dispatch(setMinPrice(value));
  };

  const handleMaxPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;
    let value: number | '' = inputValue === '' ? '' : Number(inputValue);

    // Если введено значение больше максимального
    if (value !== '') {
      // Проверка на максимальную цену
      if (value > filters.price.max) {
        value = filters.price.max;
      }

      // Если введено значение меньше текущего минимума
      if (filters.price.currentMin !== '' && value < filters.price.currentMin) {
        dispatch(setMinPrice(value));
      }
    }

    dispatch(setMaxPrice(value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder={`${filters.price.min}`}
                  value={filters.price.currentMin}
                  onChange={handleMinPriceChange}
                  min={filters.price.min}
                  max={filters.price.currentMax || filters.price.max}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder={`${filters.price.max}`}
                  value={filters.price.currentMax}
                  onChange={handleMaxPriceChange}
                  min={filters.price.currentMin || filters.price.min}
                  max={filters.price.max}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="Фотоаппарат"
                checked={filters.category === 'Фотоаппарат'}
                onChange={() => dispatch(setCategory('Фотоаппарат'))}
              />
              <span className="custom-radio__icon"></span><span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value='Видеокамера'
                checked={filters.category === 'Видеокамера'}
                onChange={() => dispatch(setCategory('Видеокамера'))}
              />
              <span className="custom-radio__icon"></span>
              <span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>
          <FilterCheckboxItem
            type='Цифровая'
            checked={filters.types['Цифровая']}
            onChange={(value) => dispatch(setType({ type: 'Цифровая', value }))}
            disabled={false}
            label='Цифровая'
          />
          <FilterCheckboxItem
            type='Плёночная'
            checked={filters.types['Плёночная']}
            onChange={(value) => dispatch(setType({ type: 'Плёночная', value }))}
            disabled={filters.category === 'Видеокамера'}
            label='Плёночная'
          />
          <FilterCheckboxItem
            type='Моментальная'
            checked={filters.types['Моментальная']}
            onChange={(value) => dispatch(setType({ type: 'Моментальная', value }))}
            disabled={filters.category === 'Видеокамера'}
            label='Моментальная'
          />
          <FilterCheckboxItem
            type='Коллекционная'
            checked={filters.types['Коллекционная']}
            onChange={(value) => dispatch(setType({ type: 'Коллекционная', value }))}
            disabled={false}
            label='Коллекционная'
          />
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>
          <FilterCheckboxItem
            type='Нулевой'
            checked={filters.levels['Нулевой']}
            onChange={(value) => dispatch(setLevel({ level: 'Нулевой', value }))}
            label='Нулевой'
          />
          <FilterCheckboxItem
            type='Любительский'
            checked={filters.levels['Любительский']}
            onChange={(value) => dispatch(setLevel({ level: 'Любительский', value }))}
            label='Любительский'
          />
          <FilterCheckboxItem
            type='Профессиональный'
            checked={filters.levels['Профессиональный']}
            onChange={(value) => dispatch(setLevel({ level: 'Профессиональный', value }))}
            label='Профессиональный'
          />
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleResetFilters}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
