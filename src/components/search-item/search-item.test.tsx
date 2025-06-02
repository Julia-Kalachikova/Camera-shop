import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import SearchItem from './search-item';
import { cardMock } from '../../testing-mocks';


describe('SearchItem Component', () => {
  it('should render correctly', () => {
    const mockOnHover = vi.fn();
    const onItemSelect = vi.fn();
    render(
      <SearchItem
        product={cardMock}
        isSelected
        onSelect={onItemSelect}
        onHover={mockOnHover}
      />
    );

    expect(screen.getByTestId('search-item')).toBeInTheDocument();
  });
});

