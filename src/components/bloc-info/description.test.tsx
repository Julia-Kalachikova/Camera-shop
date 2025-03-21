import { render, screen } from '@testing-library/react';
import Description from './description';
import { cardMock } from '../../testing-mocks';

describe('Description Component', () => {
  const mockDescription = cardMock.description;
  const mockName = cardMock.name;

  it('should render correct', () => {
    const descriptionElement = 'description';

    render(<Description description={mockDescription} name={mockName}/>);

    // Проверяем, что компонент отображается
    expect(screen.getByTestId(descriptionElement)).toBeInTheDocument();

    // Проверяем, что description отображается
    const descriptionText = screen.getByText(mockDescription);
    expect(descriptionText).toBeInTheDocument();
  });
  it('should render name correctly in the text', () => {
    render(<Description description={mockDescription} name={mockName} />);

    // Проверяем, что name отображается в тексте
    const nameText = screen.getByText(
      new RegExp(`с ${mockName} начнётся ваш путь`, 'i')
    );
    expect(nameText).toBeInTheDocument();
  });

});
