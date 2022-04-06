import { render } from '@testing-library/react';
import BingoCard from './BingoCard';

function ClickSpy() {
  this.calls = 0;
}

ClickSpy.prototype.fn = function () {
  return () => this.calls++;
}

test('component clickable when card is not in the middle (has clickable=true)', () => {
  const clickSpy = new ClickSpy();
  const mockCallback = clickSpy.fn();

  const mockCard = {
    title: 'test',
    active: true,
    clickable: true,
  };

  const bingoCard = render(<BingoCard card={mockCard} onToggleCard={mockCallback}/>);
  bingoCard.getByText('test').click();
  expect(clickSpy.calls).toEqual(1);
});

test('component clickable when card is in the middle (has clickable=false)', () => {
  const clickSpy = new ClickSpy();
  const mockCallback = clickSpy.fn();

  const mockCard = {
    title: 'test',
    active: true,
    clickable: false,
  };

  const bingoCard = render(<BingoCard card={mockCard} onToggleCard={mockCallback}/>);
  bingoCard.getByText('test').click();
  expect(clickSpy.calls).toEqual(0);
});
