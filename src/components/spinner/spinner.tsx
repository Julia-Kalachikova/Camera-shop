import './spinner-style.css';

export default function Spinner(): JSX.Element {
  return (
    <div className="root">
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
