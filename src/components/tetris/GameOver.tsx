import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">游戏结束</h2>
        <p className="text-xl mb-6">最终得分: {score}</p>
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold"
        >
          重新开始
        </button>
      </div>
    </div>
  );
} 