import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { animations } from '@/lib/animation';

interface ScoreProps {
  score: number;
  level: number;
  lines: number;
}

export function Score({ score, level, lines }: ScoreProps) {
  const { currentTheme } = useTheme();
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
        <h3 className="text-lg font-bold">分数</h3>
        <p className={`text-2xl ${animate ? animations.scoreIncrease : ''}`}>
          {score}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold">等级</h3>
        <p className="text-2xl">{level}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">消除行数</h3>
        <p className="text-2xl">{lines}</p>
      </div>
    </div>
  );
} 