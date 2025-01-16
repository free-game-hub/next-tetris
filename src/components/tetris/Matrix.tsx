import React, { useEffect, useState, useRef } from 'react';
import { GameState } from '@/lib/types';
import { BLOCK_SIZE, MATRIX_WIDTH, MATRIX_HEIGHT, getResponsiveBlockSize } from '@/lib/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { animations } from '@/lib/animation';
import { ParticleSystem } from '@/lib/particles';

interface MatrixProps {
  state: GameState;
  particleSystem?: ParticleSystem;
}

export function Matrix({ state, particleSystem }: MatrixProps) {
  const { currentTheme } = useTheme();
  const { matrix, currentBlock } = state;
  const [clearingLines, setClearingLines] = useState<number[]>([]);
  const [landingBlock, setLandingBlock] = useState(false);
  const [blockSize, setBlockSize] = useState(BLOCK_SIZE);
  const containerRef = useRef<HTMLDivElement>(null);

  // 修改响应式方块大小的计算
  useEffect(() => {
    const updateBlockSize = () => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement;
        if (!container) return;

        // 获取容器的实际尺寸
        const containerHeight = container.clientHeight;
        const containerWidth = container.clientWidth;
        
        // 计算基于容器尺寸的方块大小
        // 减去一些边距以确保不会溢出
        const maxHeightBasedSize = Math.floor((containerHeight * 0.95) / MATRIX_HEIGHT);
        const maxWidthBasedSize = Math.floor((containerWidth * 0.95) / MATRIX_WIDTH);
        
        // 使用较小的值以确保完全适应容器
        const calculatedSize = Math.min(maxHeightBasedSize, maxWidthBasedSize);
        
        // 设置方块大小，但确保不会太大
        setBlockSize(Math.min(calculatedSize, 20));
      }
    };

    updateBlockSize();
    window.addEventListener('resize', updateBlockSize);
    return () => window.removeEventListener('resize', updateBlockSize);
  }, []);

  // 处理消行动画和粒子效果
  useEffect(() => {
    const lines = matrix.reduce((acc, row, index) => {
      if (row.every(cell => cell === 1)) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    if (lines.length > 0) {
      setClearingLines(lines);

      // 延迟清除动画，给足够时间显示闪烁效果
      const timer = setTimeout(() => {
        setClearingLines([]);
      }, 1000); // 增加时间到1秒

      return () => clearTimeout(timer);
    }
  }, [matrix]);

  // 处理落地动画
  useEffect(() => {
    if (!currentBlock) {
      setLandingBlock(true);
      const timer = setTimeout(() => {
        setLandingBlock(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentBlock]);

  // 合并当前方块和矩阵
  const displayMatrix = matrix.map(row => [...row]);
  if (currentBlock) {
    const { shape, position } = currentBlock;
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value && position[0] + y >= 0) {
          displayMatrix[position[0] + y][position[1] + x] = 2;
        }
      });
    });
  }

  return (
    <div 
      ref={containerRef}
      className="tetris-matrix border border-black/20 bg-transparent relative w-full h-full flex items-center justify-center"
    >
      {/* 网格背景 */}
      <div className="grid grid-cols-10 grid-rows-20">
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-black/5" />
        ))}
      </div>
      
      {/* 游戏区域 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {displayMatrix.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: `${blockSize}px`,
                  height: `${blockSize}px`,
                }}
                className={`
                  border
                  ${cell === 0 
                    ? `${currentTheme.grid.empty} ${currentTheme.grid.border}`
                    : cell === 1 
                      ? `${currentTheme.block.fixed} border-${currentTheme.block.border} 
                         ${clearingLines.includes(y) 
                           ? 'bg-white animate-flash' 
                           : ''
                         } 
                         ${landingBlock ? animations.land : ''}`
                      : `${currentTheme.block.active} border-${currentTheme.block.border}`
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