import React from 'react';
import s from './GameControls.module.css';

interface GameControlsProps {
  onRestart: () => void;
  onEditNames: () => void;
  movesCount: number;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onRestart, 
  onEditNames, 
  movesCount 
}) => {
  return (
    <div className={s.controls}>
      <div className={s.controlButtons}>
        <button className={s.restartButton} onClick={onRestart}>
          Новая игра
        </button>
        <button className={s.editNamesButton} onClick={onEditNames}>
          Изменить имена
        </button>
      </div>
      <div className={s.movesCount}>
        Сделано ходов: {movesCount}
      </div>
    </div>
  );
};

export default GameControls;