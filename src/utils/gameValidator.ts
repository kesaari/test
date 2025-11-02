import { 
  BoardType, 
  Player, 
  Position, 
  GameResult, 
  BoardState, 
  WinnerInfo,
  ROWS, 
  COLS, 
  WINNING_LENGTH 
} from '../types/gameTypes';
import { checkWinningPositions, isBoardFull } from './gameLogic';

export const validateGame = (moves: number[]): GameResult => {
  const board: BoardType = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
  let currentWinner: WinnerInfo | null = null;
  let gameState: BoardState = 'waiting';

  if (moves.length === 0) {
    return {
      player_1: [],
      player_2: [],
      board_state: 'waiting'
    };
  }

  gameState = 'pending';

  for (let step = 0; step < moves.length; step++) {
    if (gameState === 'win' || gameState === 'draw') {
      break;
    }

    const column = moves[step];
    const playerValue: Player = step % 2 === 0 ? 1 : 2;

    let targetRow = -1;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][column] === 0) {
        targetRow = row;
        break;
      }
    }

    if (targetRow === -1) continue;

    board[targetRow][column] = playerValue;

    const winningPositions = checkWinningPositions(board, targetRow, column, playerValue);
    
    if (winningPositions.length === WINNING_LENGTH) {
      gameState = 'win';
      currentWinner = {
        who: step % 2 === 0 ? 'player_1' : 'player_2',
        positions: winningPositions
      };
    } else if (isBoardFull(board)) {
      gameState = 'draw';
    }
  }

  const player1Positions: Position[] = [];
  const player2Positions: Position[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === 1) {
        player1Positions.push([row, col]);
      } else if (board[row][col] === 2) {
        player2Positions.push([row, col]);
      }
    }
  }

  return {
    player_1: player1Positions,
    player_2: player2Positions,
    board_state: gameState,
    ...(currentWinner && { winner: currentWinner })
  };
};