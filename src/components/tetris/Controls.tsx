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
          Start Game
        </button>
      ) : (
        <button
          onClick={onPause}
          className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      )}
      
      <div className="text-gray-300 text-sm space-y-2">
        <p>← → : Move Left/Right</p>
        <p>↑ : Rotate</p>
        <p>↓ : Speed Up</p>
        <p>Space : Drop</p>
        <p>P : Pause Game</p>
      </div>
    </div>
  );
} 