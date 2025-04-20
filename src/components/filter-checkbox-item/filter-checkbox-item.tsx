type FilterCheckboxItemProps = {
  type: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  label: string;
};

export default function FilterCheckboxItem({ type, checked, onChange, disabled = false, label }: FilterCheckboxItemProps): JSX.Element {
  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          type="checkbox"
          name={type}
          checked={checked}
          onChange={(evt) => onChange(evt.target.checked)}
          disabled={disabled}
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{label}</span>
      </label>
    </div>
  );
}
