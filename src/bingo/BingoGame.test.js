import { render, screen } from '@testing-library/react';
import BingoGame from './BingoGame';

test('renders board with PIZZA tile in the middle', () => {
  render(<BingoGame />);
  const mainElement = screen.getByText(/PIZZA/i);
  expect(mainElement).toBeInTheDocument();
});
