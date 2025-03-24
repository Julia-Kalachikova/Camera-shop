import './spinner-style.css';


export default function Spinner(): JSX.Element {
  return (
    <div className="root" data-testid="spinner">
      <div className="loader" data-testid="loader">
        <span role="presentation" />
        <span role="presentation" />
        <span role="presentation" />
        <span role="presentation" />
        <span role="presentation" />
      </div>
    </div>
  );
}
