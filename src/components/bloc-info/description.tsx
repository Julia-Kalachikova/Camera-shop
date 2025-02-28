
type Props = {
  description: string;
  name: string;
}

export default function Description({ description, name }: Props): JSX.Element {
  return (
    <div className="product__tabs-text">
      <p>{description}</p>
      <p>Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с {name} начнётся ваш путь к&nbsp;наградам всех престижных кинофестивалей.</p>
    </div>
  );
}
