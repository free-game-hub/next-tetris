import React, { useEffect, useState } from 'react';
import { animations } from '@/lib/animation';

interface ScoreProps {
  score: number;
  level: number;
  lines: number;
}

export function Score({ score, level, lines }: ScoreProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="text-white space-y-4">
      <div>
        <h3 className="text-lg font-bold">Score</h3>
        <p className={`text-2xl ${animate ? animations.scoreIncrease : ''}`}>
          {score}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Level</h3>
        <p className="text-2xl">{level}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Lines</h3>
        <p className="text-2xl">{lines}</p>
      </div>
    </div>
  );
} 