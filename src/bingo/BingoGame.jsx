import { useReducer } from 'react';
import { bingoReducer, bingoInitialState } from './bingo-state';
import BingoBoard from './BingoBoard';
import BingoHeader from './BingoHeader';
import styles from './Bingo.module.css';

function BingoGame() {
  const [state, dispatch] = useReducer(bingoReducer, bingoInitialState);

  const onToggleCard = (position) => {
    dispatch({ type: 'CARD_TOGGLED', payload: position });
    dispatch({ type: 'BOARD_UPDATED', payload: state.board });
  };

  return <div className={state.isWon ? styles.isWon : ''}>
    <BingoHeader />
    <BingoBoard board={state.board} onToggleCard={onToggleCard} />
  </div>;
}

export default BingoGame;
