import { render, screen } from '@testing-library/react';
import { cardMock } from '../../testing-mocks';
import Specs from './specs';

describe('Specs Component', () => {
  const mockVendorCode = cardMock.vendorCode;
  const mockCategory = cardMock.category;
  const mockType = cardMock.type;
  const mockLevel = cardMock.level;

  it('should render correct', () => {
    render(
      <Specs
        vendorCode={mockVendorCode}
        category={mockCategory}
        type={mockType}
        level={mockLevel}
      />);

    const specsElement = screen.getByTestId('specs');
    expect(specsElement).toBeInTheDocument();

    // Проверяем, что vendorCode отображается
    const vendorCodeElement = screen.getByText(mockVendorCode);
    expect(vendorCodeElement).toBeInTheDocument();

    const categoryElement = screen.getByText(mockCategory);
    expect(categoryElement).toBeInTheDocument();

    const typeElement = screen.getByText(mockType);
    expect(typeElement).toBeInTheDocument();

    const levelElement = screen.getByText(mockLevel);
    expect(levelElement).toBeInTheDocument();
  });
});
