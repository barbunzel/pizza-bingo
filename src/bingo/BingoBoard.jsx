import BingoCard from './BingoCard';
import styles from './Bingo.module.css';

function BingoBoard({ board: rows, onToggleCard }) {
  return <div className={styles.board}>
    {rows.map((cols, row) => cols.map((card, col) =>
      <BingoCard
        key={card.title}
        card={card}
        row={row}
        col={col}
        onToggleCard={onToggleCard}
      />))}
  </div>;
}

export default BingoBoard;
