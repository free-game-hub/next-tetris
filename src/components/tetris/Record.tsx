import React from 'react';

interface RecordProps {
  highScore: number;
  lastScore: number;
}

export function Record({ highScore, lastScore }: RecordProps) {
  return (
    <div className="text-white space-y-4">
      <div>
        <h3 className="text-lg font-bold">最高分</h3>
        <p className="text-2xl text-yellow-400">{highScore}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">上局得分</h3>
        <p className="text-xl text-gray-300">{lastScore}</p>
      </div>
    </div>
  );
} 