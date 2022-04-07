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


export const isAny = board => position => conditions => conditions.reduce((acc, cur) => acc || cur[0](board)(position) === cur[1], false);

const isHorizontal = board => position => {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (!board[position.row][i].active) {
      return false;
    }
  }

  return true;
};

const isVertical = board => position => {
  for (let i = 0; i < NUMBER_OF_COLS; i++) {
    if (!board[i][position.col].active) {
      return false;
    }
  }

  return true;
};

const isLeftDiagonal = board => position => {
  if (position.row !== position.col) {
    return false;
  }

  for (let i = 0; i < position.row; i++) {
    if (!board[position.row - i][position.col - i].active) {
      return false;
    }
  }

  for (let i = position.row; i < NUMBER_OF_ROWS; i++) {
    if (!board[position.row + (i - position.row)][position.col + (i - position.col)].active) {
      return false;
    }
  }

  return true;
};

const isRightDiagonal = board => position => {
  if ((NUMBER_OF_ROWS - 1 - position.row) !== position.col) {
    return false;
  }

  for (let i = 0; i < NUMBER_OF_ROWS - position.row; i++) {
    if (!board[position.row + i][position.col - i].active) {
      return false;
    }
  }

  return true;
};

const isWon = board => position => {
  const winConditions = [
    [isHorizontal, true],
    [isVertical, true],
    [isLeftDiagonal, true],
    [isRightDiagonal, true],
  ];

  const checkConditions = isAny(board)(position);

  return checkConditions(winConditions);
};

export const bingoReducer = (state, action) => {
  switch (action.type) {
    case 'RESET_WON':
      return { ...state, isWon: false };
    case 'CARD_TOGGLED':
      return { ...state, board: toggleCard(state.board)(action.payload) };
    case 'BOARD_UPDATED':
      return { ...state, isWon: isWon(state.board)(action.payload) };
    default:
      return state;
  }
};

export const bingoInitialState = { board: newBoard(), isWon: false };
