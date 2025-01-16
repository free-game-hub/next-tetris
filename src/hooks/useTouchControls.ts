import { useEffect, useRef, useState } from 'react';

interface TouchControlsConfig {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
}

export function useTouchControls(config: TouchControlsConfig) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastMoveTime = useRef<number>(0);
  const [isMoving, setIsMoving] = useState(false);
  const moveInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      setIsMoving(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current || e.touches.length !== 1) return;

      const now = Date.now();
      if (now - lastMoveTime.current < 100) return;

      const deltaX = e.touches[0].clientX - touchStartX.current;
      const deltaY = e.touches[0].clientY - touchStartY.current;
      const minSwipeDistance = 30;

      if (!isMoving && (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance)) {
        setIsMoving(true);
      }

      if (isMoving) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > minSwipeDistance) {
            config.onMoveRight();
            touchStartX.current = e.touches[0].clientX;
          } else if (deltaX < -minSwipeDistance) {
            config.onMoveLeft();
            touchStartX.current = e.touches[0].clientX;
          }
        } else if (deltaY > minSwipeDistance) {
          config.onMoveDown();
          touchStartY.current = e.touches[0].clientY;
        }
      }

      lastMoveTime.current = now;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isMoving && touchStartX.current !== null && touchStartY.current !== null) {
        // 如果没有移动，则视为点击
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = e.changedTouches[0].clientY - touchStartY.current;
        
        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
          config.onRotate();
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
      setIsMoving(false);
      
      if (moveInterval.current) {
        clearInterval(moveInterval.current);
      }
    };

    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [config, isMoving]);
} 