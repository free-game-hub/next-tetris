import { useEffect } from 'react';

interface KeyboardControls {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  drop: () => void;
  pause: () => void;
  start: () => void;
  isPlaying: boolean;
}

export function useKeyboard({
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  drop,
  pause,
  start,
  isPlaying
}: KeyboardControls) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 防止按键事件影响页面滚动
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          moveLeft();
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveRight();
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveDown();
          break;
        case 'ArrowUp':
        case 'KeyW':
          rotate();
          break;
        case 'Space':
          // 如果游戏未开始，按空格键开始游戏
          if (!isPlaying) {
            start();
          } else {
            drop();
          }
          break;
        case 'KeyP':
          pause();
          break;
        case 'KeyR':
          start();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, moveDown, rotate, drop, pause, start, isPlaying]);
} 