import { render, screen } from '@testing-library/react';
import Pagination from './pagination';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination Component', () => {
  it('should render correctly', () => {
    const totalProductsMock = 70;
    render(
      <MemoryRouter>
        <Pagination totalProducts={totalProductsMock} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
