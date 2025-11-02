import { BoardType, Player, Position, ROWS, COLS, WINNING_LENGTH } from '../types/gameTypes';

export const initializeBoard = (): BoardType => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
};

export const getNextAvailableRow = (board: BoardType, col: number): number => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      return row;
    }
  }
  return -1;
};

export const checkWinningPositions = (
  board: BoardType, 
  row: number, 
  col: number, 
  player: Player
): Position[] => {
  const directions = [
    [0, 1],   // горизонталь
    [1, 0],   // вертикаль
    [1, 1],   // диагональ вправо-вниз
    [1, -1]   // диагональ влево-вниз
  ];

  for (const [dx, dy] of directions) {
    let positions: Position[] = [[row, col]];
    
    for (let i = 1; i < WINNING_LENGTH; i++) {
      const newRow = row + dx * i;
      const newCol = col + dy * i;
      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        board[newRow][newCol] === player
      ) {
        positions.push([newRow, newCol]);
      } else {
        break;
      }
    }

    for (let i = 1; i < WINNING_LENGTH; i++) {
      const newRow = row - dx * i;
      const newCol = col - dy * i;
      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        board[newRow][newCol] === player
      ) {
        positions.push([newRow, newCol]);
      } else {
        break;
      }
    }

    if (positions.length >= WINNING_LENGTH) {
      positions.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
      });
      return positions.slice(0, WINNING_LENGTH);
    }
  }

  return [];
};

export const checkWinner = (board: BoardType, row: number, col: number, player: Player): boolean => {
  return checkWinningPositions(board, row, col, player).length === WINNING_LENGTH;
};

export const isBoardFull = (board: BoardType): boolean => {
  return board[0].every(cell => cell !== 0);
};