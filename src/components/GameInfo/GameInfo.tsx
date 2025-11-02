import React from 'react';
import { Player, PlayerNames } from '../../types/gameTypes';
import s from './GameInfo.module.css';

interface GameInfoProps {
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  playerNames: PlayerNames;
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  currentPlayer, 
  winner, 
  playerNames 
}) => {
  const getCurrentPlayerName = () => {
    return currentPlayer === 1 ? playerNames.player1 : playerNames.player2;
  };

  const getWinnerName = () => {
    if (winner === 1) return playerNames.player1;
    if (winner === 2) return playerNames.player2;
    return '';
  };

  return (
    <div className={s.gameInfo}>
      {winner ? (
        winner === 'draw' ? (
          <div className={s.draw}>Ничья!</div>
        ) : (
          <div className={s.winner}>
            Победа {getWinnerName()}!
          </div>
        )
      ) : (
        <div className={s.status}>
          Текущий игрок: <span className={`${s.playerIndicator} ${s[`player${currentPlayer}`]}`}>
            {getCurrentPlayerName()}
          </span>
        </div>
      )}
    </div>
  );
};

export default GameInfo;