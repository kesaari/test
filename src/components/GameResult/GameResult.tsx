import React from 'react';
import { GameResult as GameResultType, PlayerNames } from '../../types/gameTypes';
import s from './GameResult.module.css';

interface GameResultProps {
  gameResult: GameResultType | null;
  playerNames: PlayerNames;
  movesCount: number;
}

// Функция для склонения слова "фишка" в зависимости от числа
const getChipsWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'фишек';
  }

  switch (lastDigit) {
    case 1:
      return 'фишка';
    case 2:
    case 3:
    case 4:
      return 'фишки';
    default:
      return 'фишек';
  }
};

const GameResult: React.FC<GameResultProps> = ({ 
  gameResult, 
  playerNames, 
  movesCount 
}) => {
  if (!gameResult || movesCount === 0) return null;

  const player1ChipsWord = getChipsWord(gameResult.player_1.length);
  const player2ChipsWord = getChipsWord(gameResult.player_2.length);

  return (
    <div className={s.gameResult}>
      <h3 className={s.title}>Детализация игры:</h3>
      
      <div className={s.playersInfo}>
        <div className={`${s.playerInfo} ${s.player1Info}`}>
          <h4>{playerNames.player1}:</h4>
          <div className={s.positions}>
            {gameResult.player_1.map((pos, index) => (
              <span key={index} className={s.position}>[{pos[0]},{pos[1]}]</span>
            ))}
          </div>
          <div className={s.count}>
            Всего: {gameResult.player_1.length} {player1ChipsWord}
          </div>
        </div>
        
        <div className={`${s.playerInfo} ${s.player2Info}`}>
          <h4>{playerNames.player2}:</h4>
          <div className={s.positions}>
            {gameResult.player_2.map((pos, index) => (
              <span key={index} className={s.position}>[{pos[0]},{pos[1]}]</span>
            ))}
          </div>
          <div className={s.count}>
            Всего: {gameResult.player_2.length} {player2ChipsWord}
          </div>
        </div>
      </div>
      
      <div className={`${s.gameState} ${s[gameResult.board_state]}`}>
        Статус: <strong>
          {gameResult.board_state === 'waiting' && 'Ожидание'}
          {gameResult.board_state === 'pending' && 'В процессе'}
          {gameResult.board_state === 'win' && 'Победа!'}
          {gameResult.board_state === 'draw' && 'Ничья!'}
        </strong>
      </div>

      {gameResult.winner && (
        <div className={s.winnerDetails}>
          <h4>Выиграл {gameResult.winner.who === 'player_1' ? playerNames.player1 : playerNames.player2}</h4>
          <div>Победная комбинация:</div>
          <div className={s.winningPositions}>
            {gameResult.winner.positions.map((pos, index) => (
              <span key={index} className={s.winPosition}>[{pos[0]},{pos[1]}]</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameResult;