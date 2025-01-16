import React from 'react';
import { BlockType } from '@/lib/types';
import { SHAPES } from '@/lib/constants';
import { useTheme } from '@/contexts/ThemeContext';

interface NextProps {
  type: BlockType;
}

export function Next({ type }: NextProps) {
  const { currentTheme } = useTheme();
  const shape = SHAPES[type].shape;
  
  // 使用更大的方块尺寸
  const blockSize = '2vh';

  // 计算容器尺寸以适应不同形状
  const width = Math.max(...shape.map(row => row.length));
  const height = shape.length;

  return (
    <div 
      className="flex items-center justify-center"
      style={{
        width: `${parseInt(blockSize) * width}vh`,
        height: `${parseInt(blockSize) * height}vh`,
      }}
    >
      <div className="relative">
        {shape.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: blockSize,
                  height: blockSize,
                }}
                className={`
                  border
                  transition-colors
                  duration-300
                  ${cell === 1 
                    ? `${currentTheme.block.active} border-${currentTheme.block.border}`
                    : 'border-transparent bg-transparent'
                  }
                `}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 