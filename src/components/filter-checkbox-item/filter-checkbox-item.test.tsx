import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import FilterCheckboxItem from './filter-checkbox-item';


describe('FilterCheckboxItem Component', () => {
  it('should render correctly', () => {
    const mockOnChange = vi.fn();

    render(
      <FilterCheckboxItem
        type="Цифровая"
        checked
        onChange={mockOnChange}
        disabled={false}
        label="Цифровая"
      />
    );

    expect(screen.getByRole('checkbox', { name: 'Цифровая' })).toBeChecked();
  });
  it('should call onChange when clicked', () => {
    const mockOnChange = vi.fn();

    render(
      <FilterCheckboxItem
        type="Цифровая"
        checked={false}
        onChange={mockOnChange}
        disabled={false}
        label="Цифровая"
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Цифровая' });
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

});
