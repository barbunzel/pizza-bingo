import styles from './Bingo.module.css';

function BingoHeader() {
    return <div className={styles.header}>
        <div className={styles.headerTitle}>P</div>
        <div className={styles.headerTitle}>I</div>
        <div className={styles.headerTitle}>Z</div>
        <div className={styles.headerTitle}>Z</div>
        <div className={styles.headerTitle}>A</div>
    </div>
}

export default BingoHeader;
