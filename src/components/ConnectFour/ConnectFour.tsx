import React, { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { 
  GameState, 
  PlayerNames, 
  Player 
} from '../../types/gameTypes';
import { 
  initializeBoard, 
  getNextAvailableRow, 
  checkWinner, 
  isBoardFull 
} from '../../utils/gameLogic';
import { validateGame } from '../../utils/gameValidator';

import PlayerNamesModal from '../PlayerNamesModal/PlayerNamesModal';
import GameBoard from '../GameBoard/GameBoard';
import GameInfo from '../GameInfo/GameInfo';
import GameControls from '../GameControls/GameControls';
import GameResult from '../GameResult/GameResult';

import s from './ConnectFour.module.css';

const ConnectFour: React.FC = () => {
  // Состояние игры
  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    currentPlayer: 1,
    winner: null,
    isDropping: false,
    moves: [],
    gameResult: null
  });

  // Состояние имен игроков
  const [playerNames, setPlayerNames] = useState<PlayerNames>({
    player1: 'Игрок 1',
    player2: 'Игрок 2'
  });
  const [isNameModalVisible, setIsNameModalVisible] = useState(true);

  // Инициализация игры
  const initializeGame = useCallback(() => {
    setGameState({
      board: initializeBoard(),
      currentPlayer: 1,
      winner: null,
      isDropping: false,
      moves: [],
      gameResult: null
    });
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Обработчики имен игроков
  const handleNamesSave = (names: PlayerNames) => {
    setPlayerNames(names);
    setIsNameModalVisible(false);
    message.success('Имена игроков сохранены!');
  };

  const handleEditNames = () => {
    setIsNameModalVisible(true);
  };

  // Ход игрока
  const handleColumnClick = async (col: number) => {
    const { board, currentPlayer, winner, isDropping, moves } = gameState;
    
    if (winner || isDropping) return;

    const row = getNextAvailableRow(board, col);
    if (row === -1) return;

    setGameState(prev => ({ ...prev, isDropping: true }));

    // Анимация падения фишки
    for (let i = 0; i <= row; i++) {
      const tempBoard = [...board];
      tempBoard[i] = [...tempBoard[i]];
      tempBoard[i][col] = currentPlayer;
      setGameState(prev => ({ ...prev, board: [...tempBoard] }));
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Установка фишки в конечную позицию
    const finalBoard = [...board];
    finalBoard[row] = [...finalBoard[row]];
    finalBoard[row][col] = currentPlayer;

    // Добавляем ход в историю
    const newMoves = [...moves, col];

    // Проверка условий игры
    let newWinner: Player | 'draw' | null = null;
    if (checkWinner(finalBoard, row, col, currentPlayer)) {
      newWinner = currentPlayer;
    } else if (isBoardFull(finalBoard)) {
      newWinner = 'draw';
    }

    const nextPlayer = newWinner ? currentPlayer : (currentPlayer === 1 ? 2 : 1);

    setGameState({
      board: finalBoard,
      currentPlayer: nextPlayer,
      winner: newWinner,
      isDropping: false,
      moves: newMoves,
      gameResult: null
    });
  };

  // Валидация игры при изменении ходов
  useEffect(() => {
    if (gameState.moves.length > 0) {
      const result = validateGame(gameState.moves);
      setGameState(prev => ({ ...prev, gameResult: result }));
    }
  }, [gameState.moves]);

  return (
    <div className={s.container}>
      <PlayerNamesModal
        isVisible={isNameModalVisible}
        onSave={handleNamesSave}
        initialNames={playerNames}
      />
      
      <GameInfo
        currentPlayer={gameState.currentPlayer}
        winner={gameState.winner}
        playerNames={playerNames}
      />

      <GameBoard
        board={gameState.board}
        onColumnClick={handleColumnClick}
        isDropping={gameState.isDropping}
        winner={gameState.winner}
      />

      <GameControls
        onRestart={initializeGame}
        onEditNames={handleEditNames}
        movesCount={gameState.moves.length}
      />

      <GameResult
        gameResult={gameState.gameResult}
        playerNames={playerNames}
        movesCount={gameState.moves.length}
      />
    </div>
  );
};

export default ConnectFour;