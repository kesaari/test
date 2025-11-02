import React from 'react';
import { BoardType, Player } from '../../types/gameTypes';
import s from './GameBoard.module.css';

interface GameBoardProps {
  board: BoardType;
  onColumnClick: (col: number) => void;
  isDropping: boolean;
  winner: Player | 'draw' | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  onColumnClick, 
  isDropping, 
  winner 
}) => {
  const renderCell = (row: number, col: number) => {
    const value = board[row][col];
    let cellClass = s.cell;
    
    if (value === 1) {
      cellClass += ` ${s.player1}`;
    } else if (value === 2) {
      cellClass += ` ${s.player2}`;
    }

    return (
      <div
        key={`${row}-${col}`}
        className={cellClass}
        onClick={() => !isDropping && !winner && onColumnClick(col)}
      />
    );
  };

  return (
    <div className={s.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={s.row}>
          {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;