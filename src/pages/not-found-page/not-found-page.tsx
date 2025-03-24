import { Link } from 'react-router-dom';
import { RoutePath } from '../../const';
import './not-found-page-style.css';


export default function NotFoundPage(): JSX.Element {
  return (
    <div className="not-found-page" data-testid='not_found'>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to={RoutePath.Catalog}>В каталог</Link>
    </div>
  );
}

