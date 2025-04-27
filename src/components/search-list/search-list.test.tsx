import { render, screen } from '@testing-library/react';
import SearchList from './search-list';
import { cardsMocks } from '../../testing-mocks';
import { createRef } from 'react';

describe('SearchList', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });
  it('should render correctly', () => {
    const mockRef = createRef<HTMLUListElement>();
    const mockOnHover = vi.fn();
    const mockOnSelect = vi.fn();
    const mockSelectedIndex = 1;

    render(
      <SearchList
        results={cardsMocks}
        dropdownRef={mockRef}
        selectedIndex={mockSelectedIndex}
        onItemSelect={mockOnSelect}
        onItemHover={mockOnHover}
      />
    );
    expect(screen.getByTestId('search-list')).toBeInTheDocument();
  });
});
