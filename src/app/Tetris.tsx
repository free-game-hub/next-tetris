'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Matrix } from '@/components/tetris/Matrix';
import { Next } from '@/components/tetris/Next';
import { useGameState } from '@/hooks/useGameState';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useTouchControls } from '@/hooks/useTouchControls';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { KeyboardGuide } from '@/components/tetris/KeyboardGuide';
import { ParticleCanvas } from '@/components/tetris/ParticleCanvas';
import { ParticleSystem } from '@/lib/particles';
import { RetroFrame } from '@/components/tetris/RetroFrame';
import { soundManager } from '@/lib/sound';

export default function Tetris() {
  const {
    state,
    record,
    showGuide,
    setShowGuide,
    gameTime,
    combo,
    newAchievements,
    moveBlock,
    rotateBlock,
    startGame,
    pauseGame,
    dropBlock
  } = useGameState();

  const [particleSystem, setParticleSystem] = useState<ParticleSystem>();

  const handleToggleSound = useCallback(() => {
    soundManager.toggle();
  }, []);

  // 使用键盘控制
  useKeyboard({
    moveLeft: () => moveBlock('left'),
    moveRight: () => moveBlock('right'),
    moveDown: () => moveBlock('down'),
    rotate: rotateBlock,
    drop: dropBlock,
    pause: pauseGame,
    start: () => {
      // 如果游戏结束或未开始，则重新开始游戏
      if (!state.isPlaying || state.gameOver) {
        startGame();
      }
    },
    isPlaying: state.isPlaying && !state.gameOver // 游戏状态需要考虑 gameOver
  });

  useTouchControls({
    onMoveLeft: () => moveBlock('left'),
    onMoveRight: () => moveBlock('right'),
    onMoveDown: () => moveBlock('down'),
    onRotate: rotateBlock,
  });

  useEffect(() => {
    if (particleSystem && newAchievements.length > 0) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      particleSystem.emit(centerX, centerY, 50, '#FCD34D', {
        spread: 100,
        speed: 8,
        size: 4,
        life: 100
      });
    }
  }, [newAchievements, particleSystem]);

  useEffect(() => {
    if (particleSystem && state.gameOver) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      particleSystem.emit(centerX, centerY, 100, '#EF4444', {
        spread: 200,
        speed: 10,
        size: 5,
        life: 120
      });
    }
  }, [state.gameOver, particleSystem]);

  // 添加日志来跟踪状态变化
  useEffect(() => {
    console.log('Game State:', {
      currentScore: state.score,
      currentLines: state.lines,
      currentLevel: state.level,
      recordScore: record.stats.totalScore,
      recordLines: record.stats.totalLines,
      recordLevel: record.stats.maxLevel,
    });
  }, [state.score, state.lines, state.level, record.stats]);

  return (
    <ThemeProvider>
      <>
        <ParticleCanvas onInit={setParticleSystem} />
        
        <div className="min-h-screen bg-teal-600 flex items-center justify-center">
          <div className="h-screen flex items-center justify-center overflow-hidden">
            <RetroFrame
              onPause={pauseGame}
              onReset={startGame}
              onToggleSound={handleToggleSound}
              onMoveLeft={() => moveBlock('left')}
              onMoveRight={() => moveBlock('right')}
              onMoveDown={() => moveBlock('down')}
              onRotate={rotateBlock}
              onDrop={dropBlock}
              isPlaying={state.isPlaying}
              gameOver={state.gameOver}
              highScore={record.stats.totalScore}
              lines={state.lines}
              level={state.level}
              gameTime={gameTime}
              combo={combo}
              nextBlock={<Next type={state.nextBlock} />}
            >
              <div className="w-full h-full flex gap-[1vh] overflow-hidden">
                <div className="flex-[3] flex items-center justify-center overflow-hidden">
                  <Matrix state={state} />
                </div>
                
                <div className="flex-1 flex flex-col justify-center space-y-[1vh] font-lcd text-[1.5vh]">
                  <div>
                    <div>High Score</div>
                    <div className="text-right">{record.stats.totalScore}</div>
                  </div>
                  
                  <div>
                    <div>Lines</div>
                    <div className="text-right">{state.lines}</div>
                  </div>
                  
                  <div>
                    <div>Level</div>
                    <div className="text-right">{state.level}</div>
                  </div>
                  
                  <div>
                    <div>Time</div>
                    <div className="text-right">
                      {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div>
                    <div>Combo</div>
                    <div className="text-right">{combo}</div>
                  </div>
                  
                  <div>
                    <div>Next</div>
                    <div className="flex justify-end">
                      <Next type={state.nextBlock} />
                    </div>
                  </div>
                </div>
              </div>
            </RetroFrame>
          </div>
        </div>

        <KeyboardGuide 
          show={showGuide} 
          onClose={() => setShowGuide(false)} 
        />
      </>
    </ThemeProvider>
  );
} 