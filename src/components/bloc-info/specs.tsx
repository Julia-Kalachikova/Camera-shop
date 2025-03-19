type Props = {
  vendorCode: string;
  category: string;
  type: string;
  level: string;
}

export default function Specs({ vendorCode, category, type, level }: Props): JSX.Element {
  return (
    <ul className="product__tabs-list" data-testid="specs">
      <li className="item-list"><span className="item-list__title">Артикул:</span>
        <p className="item-list__text">{vendorCode}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Категория:</span>
        <p className="item-list__text">{category}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Тип камеры:</span>
        <p className="item-list__text">{type}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Уровень:</span>
        <p className="item-list__text">{level}</p>
      </li>
    </ul>
  );
}
