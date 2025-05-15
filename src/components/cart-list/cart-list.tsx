import { selectCartItems } from '../../store/selectors/selectors';
import { decreaseCount, increaseCount, removeFromCart, setCount } from '../../store/slice/cart-slice';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';


export default function CartList(): JSX.Element {

  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleIncrease = (id: number) => {
    dispatch(increaseCount(id));
  };
  const handleDecrease = (id: number) => {
    dispatch(decreaseCount(id));
  };
  const handleSetCount = (id: number, value: string) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      dispatch(setCount({ id, count: numericValue }));
    }
  };

  return (
    <ul className="basket__list">
      {cartItems.map((item) => (
        <li className="basket-item" key={item.id}>
          <div className="basket-item__img">
            <picture>
              <source
                type={item.type}
                srcSet={`${item.previewImgWebp}, ${item.previewImgWebp2x}`}
              />
              <img
                src={item.previewImg}
                srcSet={item.previewImg2x}
                width={140}
                height={120}
                alt="{Фотоаппарат} «Орлёнок»"
              />
            </picture>
          </div>
          <div className="basket-item__description">
            <p className="basket-item__title">{item.category} «{item.name}»</p>
            <ul className="basket-item__list">
              <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{item.vendorCode}</span>
              </li>
              <li className="basket-item__list-item">{item.type} {item.category}</li>
              <li className="basket-item__list-item">{item.level} уровень</li>
            </ul>
          </div>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{item.price.toLocaleString('ru-RU')} ₽</p>
          <div className="quantity">
            <button
              className="btn-icon btn-icon--prev"
              aria-label="уменьшить количество товара"
              onClick={() => handleDecrease(item.id)}
              disabled={item.count <= 1}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <label
              className="visually-hidden"
              htmlFor="counter1"
            >
            </label>
            <input
              type="number"
              id={`counter-${item.id}`}
              value={item.count}
              min="1"
              max="99"
              onChange={(e) => handleSetCount(item.id, e.target.value)}
              aria-label="количество товара"
            />
            <button
              className="btn-icon btn-icon--next"
              aria-label="увеличить количество товара"
              onClick={() => handleIncrease(item.id)}
              disabled={item.count >= 99}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket-item__total-price">
            <span className="visually-hidden">Общая цена:</span>{(item.price * item.count).toLocaleString('ru-RU')} ₽
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Удалить товар"
            onClick={() => handleRemoveFromCart(item.id)}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
