import { useEffect, useReducer } from 'react';
import { bingoReducer, bingoInitialState } from './bingo-state';
import BingoBoard from './BingoBoard';
import BingoHeader from './BingoHeader';
import styles from './Bingo.module.css';

const WINNING_ANIMATION_DURATION = 3000;

function BingoGame() {
  const [state, dispatch] = useReducer(bingoReducer, bingoInitialState);

  useEffect(() => {
    if (state.isWon) {
      const winningTimer = setTimeout(() => {
        dispatch({ type: 'RESET_WON' });
      }, WINNING_ANIMATION_DURATION);

      return () => clearTimeout(winningTimer);
    }
  }, [state.isWon]);

  const onToggleCard = (position) => {
    dispatch({ type: 'RESET_WON' });
    dispatch({ type: 'CARD_TOGGLED', payload: position });
    dispatch({ type: 'BOARD_UPDATED', payload: position });
  };

  return <div className={state.isWon ? styles.isWon : ''}>
    <BingoHeader />
    <BingoBoard board={state.board} onToggleCard={onToggleCard} />
  </div>;
}

export default BingoGame;
