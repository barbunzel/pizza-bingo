import { isAny } from '../utils/functional';
import data from './bingo-data.json';
const { ingredients } = data;

const NUMBER_OF_ROWS = 5;
const NUMBER_OF_COLS = 5;

const getNewTitle = () => {
  const randomIndex = Math.floor(Math.random() * ingredients.length);
  const randomElement = ingredients.splice(randomIndex, 1)[0];
  return randomElement;
};

const newCard = () => ({
  title: getNewTitle(),
  active: false,
  clickable: true,
});

const newBoard = () => Array(NUMBER_OF_ROWS)
  .fill(Array(NUMBER_OF_COLS).fill(null))
  .map((cols, row) => cols.map((_, col) =>
    row === Math.floor(NUMBER_OF_ROWS / 2) && col === Math.floor(NUMBER_OF_COLS / 2) ?
      { title: 'PIZZA', active: true, clickable: false } :
      newCard()
    ));

const toggleCard = board => position =>
  board.map((cols, row) =>
    cols.map((card, col) => row === position.row && col === position.col ? { ...card, active: !card.active } : card));

const isHorizontal = board => board.some(cols => cols.every(card => card.active));

const isVertical = board => {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    let isColumnActive = true;
    for (let j = 0; j < NUMBER_OF_COLS; j++) {
      if (!board[j][i].active) {
        isColumnActive = false;
        break;
      }
    }

    if (isColumnActive) {
      return true;
    }
  }

  return false;
};

const isLeftDiagonal = board => {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (!board[i][i].active) {
      return false;
    }
  }

  return true;
};

const isRightDiagonal = board => {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (!board[i][NUMBER_OF_ROWS - 1 - i].active) {
      return false;
    }
  }

  return true;
};

const isWon = board => {
  const winConditions = [
    [isHorizontal, true],
    [isVertical, true],
    [isLeftDiagonal, true],
    [isRightDiagonal, true],
  ];

  const checkConditions = isAny(board);

  return checkConditions(winConditions);
};

export const bingoReducer = (state, action) => {
  switch (action.type) {
    case 'CARD_TOGGLED':
      return { ...state, board: toggleCard(state.board)(action.payload) };
    case 'BOARD_UPDATED':
      return { ...state, isWon: isWon(state.board) }
    default:
      return state;
  }
};

export const bingoInitialState = { board: newBoard(), isWon: false };
