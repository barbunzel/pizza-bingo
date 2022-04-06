import styles from './Bingo.module.css';

function BingoCard({ card, row, col, onToggleCard }) {
  return <div
    className={`${styles.card} ${card.active ? styles.active : styles.inactive}`}
    onClick={() => card.clickable ? onToggleCard({ row, col }) : null}>
      {card.title}
    </div>;
}

export default BingoCard;
