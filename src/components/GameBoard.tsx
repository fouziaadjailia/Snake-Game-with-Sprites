import React, { useEffect, useState, useCallback } from 'react';
import { Snake } from './Snake';
import { Apple } from './Sprites';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10, type: 'head', direction: 'down' },
  { x: 10, y: 9, type: 'straight', direction: 'down' },
  { x: 10, y: 8, type: 'tail', direction: 'down' },
];

export const GameBoard = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [apple, setApple] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('down');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateApple = useCallback(() => {
    let newApple;
    do {
      newApple = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));
    setApple(newApple);
  }, [snake]);

  const updateSnakeSegments = (newHead: any, growing = false) => {
    const newSnake = [];
    
    // Add head
    newSnake.push({ ...newHead, type: 'head' });
    
    // Add body segments
    for (let i = 0; i < (growing ? snake.length : snake.length - 1); i++) {
      const current = snake[i];
      const next = snake[i + 1];
      const prev = i === 0 ? newHead : snake[i - 1];
      
      let type = 'straight';
      if (next && (current.x !== next.x && current.y !== next.y)) {
        type = 'corner';
      }
      newSnake.push({ ...current, type });
    }
    
    // Update tail
    if (newSnake.length > 1) {
      newSnake[newSnake.length - 1].type = 'tail';
    }
    
    return newSnake;
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const head = snake[0];
    let newHead = { ...head };

    switch (direction) {
      case 'up':
        newHead.y -= 1;
        break;
      case 'down':
        newHead.y += 1;
        break;
      case 'left':
        newHead.x -= 1;
        break;
      case 'right':
        newHead.x += 1;
        break;
    }

    // Check collision with walls
    if (
      newHead.x < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y < 0 ||
      newHead.y >= BOARD_SIZE
    ) {
      setGameOver(true);
      return;
    }

    // Check collision with self
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      return;
    }

    // Check if apple is eaten
    const growing = newHead.x === apple.x && newHead.y === apple.y;
    if (growing) {
      setScore(prev => prev + 1);
      generateApple();
    }

    const newSnake = updateSnakeSegments(newHead, growing);
    setSnake(newSnake);
  }, [snake, direction, apple, gameOver, generateApple]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (gameOver) return;

      const opposites = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
      };

      if (['arrowup', 'w'].includes(key) && direction !== opposites.up) {
        setDirection('up');
      } else if (['arrowdown', 's'].includes(key) && direction !== opposites.down) {
        setDirection('down');
      } else if (['arrowleft', 'a'].includes(key) && direction !== opposites.left) {
        setDirection('left');
      } else if (['arrowright', 'd'].includes(key) && direction !== opposites.right) {
        setDirection('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    const gameInterval = setInterval(moveSnake, 150);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [direction, moveSnake, gameOver]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('down');
    setGameOver(false);
    setScore(0);
    generateApple();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-4 text-2xl font-bold">Score: {score}</div>
      <div className="relative w-[600px] h-[600px] bg-gray-800 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-700/30"
            />
          ))}
        </div>
        
        <Snake snake={snake} />
        <Apple position={apple} />
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};