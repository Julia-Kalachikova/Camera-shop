import { selectSorting } from '../../store/selectors/selectors';
import { setSortOrder, setSortType } from '../../store/slice/sorting-slice';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { SortOrder, SortType } from '../../types';


export default function Sorting(): JSX.Element {

  const dispatch = useAppDispatch();
  const { type, order } = useAppSelector(selectSorting);

  const handleTypeChange = (newType: SortType) => {
    dispatch(setSortType(newType));
  };

  const handleOrderChange = (newOrder: SortOrder) => {
    dispatch(setSortOrder(newOrder));
  };


  return (
    <div className="catalog-sort" data-testid='sorting'>
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title&#45;&#45;h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={type === SortType.Price}
                onChange={() => handleTypeChange(SortType.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={type === SortType.Popular}
                onChange={() => handleTypeChange(SortType.Popular)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                checked={order === SortOrder.Asc}
                onChange={() => handleOrderChange(SortOrder.Asc)}
                aria-label="По возрастанию"
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                checked={order === SortOrder.Desc}
                onChange={() => handleOrderChange(SortOrder.Desc)}
                aria-label="По убыванию"
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
