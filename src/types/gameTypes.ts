export type Player = 1 | 2;
export type CellValue = 0 | Player;
export type BoardType = CellValue[][];

export type PlayerKey = 'player_1' | 'player_2';
export type Position = [number, number];
export type BoardState = 'waiting' | 'pending' | 'win' | 'draw';

export interface WinnerInfo {
  who: PlayerKey;
  positions: Position[];
}

export interface GameResult {
  player_1: Position[];
  player_2: Position[];
  board_state: BoardState;
  winner?: WinnerInfo;
}

export interface PlayerNames {
  player1: string;
  player2: string;
}

export interface GameState {
  board: BoardType;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  isDropping: boolean;
  moves: number[];
  gameResult: GameResult | null;
}

export const ROWS = 6;
export const COLS = 7;
export const WINNING_LENGTH = 4;