import { toast } from 'react-toastify';

export default function TestComponent() {
  const handleClick = () => {
    toast.success('Тестовый тост!');
  };

  return (
    <button onClick={handleClick}>Показать тост</button>
  );
}
