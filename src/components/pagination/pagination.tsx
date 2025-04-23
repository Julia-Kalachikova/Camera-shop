import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS_PER_PAGE, VISIBLE_PAGES } from '../../const';


type PaginationProps = {
  totalProducts: number;
};

export default function Pagination({ totalProducts }: PaginationProps): JSX.Element | null {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageCount = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(page));
    }
    return `?${newParams.toString()}`;
  };

  if (pageCount <= 1) {
    return null;
  }

  const renderPageItems = () => {
    const items = [];
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(pageCount, startPage + VISIBLE_PAGES - 1);

    // Корректировка диапазона, если near the end
    if (endPage - startPage < VISIBLE_PAGES - 1) {
      startPage = Math.max(1, endPage - VISIBLE_PAGES + 1);
    }
    // Кнопка "Назад"
    if (startPage > 1) {
      items.push(
        <li key="prev" className="pagination__item">
          <Link
            to={handlePageChange(startPage - 1)}
            className="pagination__link pagination__link--text"
          >
            Назад
          </Link>
        </li>
      );
    }
    //Номера страниц
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i} className="pagination__item">
          <Link
            to={handlePageChange(i)}
            className={`pagination__link ${i === currentPage ? 'pagination__link--active' : ''}`}
          >
            {i}
          </Link>
        </li>
      );
    }
    //далее
    if (endPage < pageCount) {
      items.push(
        <li key="next" className="pagination__item">
          <Link
            to={handlePageChange(endPage + 1)}
            className="pagination__link pagination__link--text"
          >
            Далее
          </Link>
        </li>
      );
    }
    return items;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {renderPageItems()}
      </ul>
    </div>
  );
}
