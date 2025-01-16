import React from 'react';

interface ControlsProps {
  onStart: () => void;
  onPause: () => void;
  isPlaying: boolean;
  isPaused: boolean;
}

export function Controls({ onStart, onPause, isPlaying, isPaused }: ControlsProps) {
  return (
    <div className="space-y-4">
      {!isPlaying ? (
        <button
          onClick={onStart}
          className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold"
        >
          开始游戏
        </button>
      ) : (
        <button
          onClick={onPause}
          className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold"
        >
          {isPaused ? '继续' : '暂停'}
        </button>
      )}
      
      <div className="text-gray-300 text-sm space-y-2">
        <p>← → : 左右移动</p>
        <p>↑ : 旋转</p>
        <p>↓ : 加速下落</p>
        <p>空格 : 直接落地</p>
        <p>P : 暂停游戏</p>
      </div>
    </div>
  );
} 