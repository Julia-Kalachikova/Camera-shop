import React, { useEffect } from 'react';
import { selectCards } from '../../store/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { StateType } from '../../store/store-types';
import { resetFilters, setCategory, setLevel, setMaxPrice, setMinPrice, setPriceRange, setType } from '../../store/slice/filters-slice';
import FilterCheckboxItem from '../filter-checkbox-item/filter-checkbox-item';

export default function Filters(): JSX.Element {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: StateType) => state.filters);
  const productCards = useAppSelector(selectCards);

  // При загрузке устанавливаем диапазон цен
  useEffect(() => {
    if (productCards.length > 0) {
      const prices = productCards.map((product) => product.price);
      dispatch(setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices),
      }));
    }
  }, [productCards, dispatch]);


  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const v = evt.target.value === '' ? '' : Number(evt.target.value);
    dispatch(setMinPrice(v));
  };

  const handleMaxPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const v = evt.target.value === '' ? '' : Number(evt.target.value);
    dispatch(setMaxPrice(v));
  };

  const handleMinPriceBlur = () => {
    // берем введённое или default
    let value = filters.price.currentMin === ''
      ? filters.price.defaultMin
      : filters.price.currentMin;

    // корректируем по границам
    if (value < filters.price.defaultMin) {
      value = filters.price.defaultMin;
    }
    if (value > (filters.price.currentMax || filters.price.defaultMax)) {
      value = filters.price.currentMax || filters.price.defaultMax;
    }

    dispatch(setMinPrice(value));
  };

  const handleMaxPriceBlur = () => {
    let value = filters.price.currentMax === ''
      ? filters.price.defaultMax
      : filters.price.currentMax;

    if (value > filters.price.defaultMax) {
      value = filters.price.defaultMax;
    }
    if (value < (filters.price.currentMin || filters.price.defaultMin)) {
      value = filters.price.currentMin || filters.price.defaultMin;
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
                  placeholder={`${filters.price.defaultMin}`}
                  value={filters.price.currentMin}
                  onChange={handleMinPriceChange}
                  onBlur={handleMinPriceBlur}
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
                  onBlur={handleMaxPriceBlur}
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
