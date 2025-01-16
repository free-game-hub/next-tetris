import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, BlockType } from '../lib/types';
import { INITIAL_STATE, SHAPES, SPEEDS, POINTS, MATRIX_WIDTH } from '../lib/constants';
import { getRandomBlock, canMove, mergeBlock, rotateShape, clearLines } from '../lib/blocks';
import { saveGameRecord, getGameRecord } from '@/lib/storage';
import { soundManager } from '@/lib/sound';
import { achievements } from '@/lib/achievements';

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [record, setRecord] = useState(getGameRecord());
  const [showGuide, setShowGuide] = useState(true);
  const gameLoop = useRef<NodeJS.Timeout>();
  const [gameTime, setGameTime] = useState(0);
  const [combo, setCombo] = useState(0);
  const gameTimer = useRef<NodeJS.Timeout>();
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  // 创建新方块
  const createNewBlock = useCallback(() => {
    const type = state.nextBlock;
    const shape = SHAPES[type].shape;
    const position: [number, number] = [0, Math.floor(MATRIX_WIDTH / 2) - Math.floor(shape[0].length / 2)];

    if (!canMove(position, shape, state.matrix)) {
      // 游戏结束
      setState(prev => ({ ...prev, gameOver: true }));
      return;
    }

    setState(prev => ({
      ...prev,
      currentBlock: {
        type,
        shape,
        position,
        rotation: 0
      },
      nextBlock: getRandomBlock()
    }));
  }, [state.nextBlock, state.matrix]);

  // 先定义 moveBlock
  const moveBlock = useCallback((direction: 'left' | 'right' | 'down') => {
    if (!state.currentBlock || state.isPaused || state.gameOver) return;
    
    console.log(`Moving block: ${direction}`);
    
    setState(prev => {
      const newPosition = [...prev.currentBlock!.position];
      
      switch(direction) {
        case 'left':
          newPosition[1] -= 1;
          break;
        case 'right':
          newPosition[1] += 1;
          break;
        case 'down':
          newPosition[0] += 1;
          break;
      }
      
      if (canMove(newPosition, prev.currentBlock!.shape, prev.matrix)) {
        console.log(`Move successful to position:`, newPosition);
        soundManager.play('move');
        return {
          ...prev,
          currentBlock: {
            ...prev.currentBlock!,
            position: newPosition
          }
        };
      }
      
      console.log(`Move blocked at position:`, newPosition);
      return prev;
    });
  }, [state.currentBlock, state.isPaused, state.gameOver]);

  // 然后定义 rotateBlock
  const rotateBlock = useCallback(() => {
    if (!state.currentBlock || state.isPaused || state.gameOver) return;

    const { shape, position } = state.currentBlock;
    const newShape = rotateShape(shape);
    
    if (canMove(position, newShape, state.matrix)) {
      setState(prev => ({
        ...prev,
        currentBlock: {
          ...prev.currentBlock!,
          shape: newShape
        }
      }));

      soundManager.play('rotate');
    }
  }, [state.currentBlock, state.isPaused, state.gameOver, state.matrix]);

  // 开始游戏
  const startGame = useCallback(() => {
    setShowGuide(false);
    setGameTime(0);
    setCombo(0);
    setState(prev => ({
      ...INITIAL_STATE,
      nextBlock: getRandomBlock(),
      isPlaying: true
    }));
    createNewBlock();
  }, [createNewBlock]);

  // 暂停游戏
  const pauseGame = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  // 处理方块落地
  const handleLanding = useCallback(() => {
    if (!state.currentBlock) return;

    const newMatrix = mergeBlock(
      state.matrix,
      state.currentBlock.shape,
      state.currentBlock.position
    );

    const { newMatrix: clearedMatrix, linesCleared } = clearLines(newMatrix);
    const newScore = state.score + (linesCleared > 0 ? POINTS[linesCleared - 1] : 0);
    const newLines = state.lines + linesCleared;
    const newLevel = Math.floor(newLines / 10) + 1;
    
    setState(prev => ({
      ...prev,
      matrix: clearedMatrix,
      currentBlock: null,
      score: newScore,
      lines: newLines,
      level: newLevel
    }));

    // 保存记录
    if (linesCleared > 0) {
      setCombo(prev => prev + 1);
    } else {
      setCombo(0);
    }
    
    const newRecord = saveGameRecord({
      lastScore: newScore,
      lastLevel: newLevel,
      lastLines: newLines,
      combo: linesCleared > 0 ? combo + 1 : combo
    });
    setRecord(newRecord);

    if (linesCleared > 0) {
      soundManager.play('clear');
    } else {
      soundManager.play('drop');
    }
  }, [state.currentBlock, state.matrix, state.score, state.lines, combo]);

  // 添加快速落地功能
  const dropBlock = useCallback(() => {
    if (!state.currentBlock || state.isPaused || state.gameOver) return;
    
    setState(prev => {
      if (!prev.currentBlock) return prev;
      
      let newPosition = [...prev.currentBlock.position];
      while (canMove([newPosition[0] + 1, newPosition[1]], prev.currentBlock!.shape, prev.matrix)) {
        newPosition[0]++;
      }
      
      const newMatrix = mergeBlock(
        prev.matrix,
        prev.currentBlock.shape,
        newPosition
      );
      
      const { newMatrix: clearedMatrix, linesCleared } = clearLines(newMatrix);
      
      return {
        ...prev,
        matrix: clearedMatrix,
        currentBlock: null,
        score: prev.score + (linesCleared > 0 ? POINTS[linesCleared - 1] : 0) + 2,
        lines: prev.lines + linesCleared,
        level: Math.floor((prev.lines + linesCleared) / 10) + 1
      };
    });
  }, [state.currentBlock, state.isPaused, state.gameOver]);

  // 游戏主循环
  useEffect(() => {
    if (!state.isPlaying || state.isPaused || state.gameOver) {
      console.log('Game loop stopped:', { isPlaying: state.isPlaying, isPaused: state.gameOver });
      if (gameLoop.current) {
        clearInterval(gameLoop.current);
      }
      return;
    }

    console.log('Starting game loop with speed:', SPEEDS[Math.min(state.level - 1, SPEEDS.length - 1)]);
    
    gameLoop.current = setInterval(() => {
      setState(prev => {
        if (!prev.currentBlock) {
          console.log('No current block, creating new one');
          // 直接在这里创建新方块，而不是依赖外部的 createNewBlock
          const type = prev.nextBlock;
          const shape = SHAPES[type].shape;
          const position: [number, number] = [0, Math.floor(MATRIX_WIDTH / 2) - Math.floor(shape[0].length / 2)];

          if (!canMove(position, shape, prev.matrix)) {
            return { ...prev, gameOver: true };
          }

          return {
            ...prev,
            currentBlock: {
              type,
              shape,
              position,
              rotation: 0
            },
            nextBlock: getRandomBlock()
          };
        }

        const newPosition: [number, number] = [
          prev.currentBlock.position[0] + 1,
          prev.currentBlock.position[1]
        ];

        console.log('Game loop trying to move block down to:', newPosition);

        if (canMove(newPosition, prev.currentBlock.shape, prev.matrix)) {
          console.log('Auto-drop successful');
          return {
            ...prev,
            currentBlock: {
              ...prev.currentBlock,
              position: newPosition
            }
          };
        } else {
          console.log('Block landed');
          const newMatrix = mergeBlock(
            prev.matrix,
            prev.currentBlock.shape,
            prev.currentBlock.position
          );
          
          const { newMatrix: clearedMatrix, linesCleared } = clearLines(newMatrix);
          const newScore = prev.score + (linesCleared > 0 ? POINTS[linesCleared - 1] : 0);
          const newLines = prev.lines + linesCleared;
          const newLevel = Math.floor(newLines / 10) + 1;

          if (linesCleared > 0) {
            soundManager.play('clear');
          } else {
            soundManager.play('drop');
          }

          return {
            ...prev,
            matrix: clearedMatrix,
            currentBlock: null,
            score: newScore,
            lines: newLines,
            level: newLevel
          };
        }
      });
    }, SPEEDS[Math.min(state.level - 1, SPEEDS.length - 1)]);

    return () => {
      console.log('Cleaning up game loop');
      if (gameLoop.current) {
        clearInterval(gameLoop.current);
      }
    };
  }, [state.isPlaying, state.isPaused, state.gameOver, state.level]);

  // 检查成就
  const checkAchievements = useCallback((stats: GameStats) => {
    const newlyCompleted = achievements
      .filter(achievement => 
        achievement.condition(stats) && 
        !newAchievements.includes(achievement.id)
      )
      .map(a => a.id);

    if (newlyCompleted.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyCompleted]);
      // 播放成就解锁音效
      soundManager.play('achievement');
    }
  }, [newAchievements]);

  // 修改游戏结束逻辑
  useEffect(() => {
    if (state.gameOver) {
      soundManager.play('gameOver');
      const stats = {
        totalScore: record.stats.totalScore + state.score,
        maxCombo: Math.max(record.stats.maxCombo, combo),
        gamesPlayed: record.stats.gamesPlayed + 1,
        totalLines: record.stats.totalLines + state.lines,
        maxLevel: Math.max(record.stats.maxLevel, state.level),
        bestTime: record.stats.bestTime ? 
          Math.max(record.stats.bestTime, gameTime) : 
          gameTime
      };
      checkAchievements(stats);
    }
  }, [state.gameOver, state.score, state.lines, state.level, gameTime, combo, record.stats, checkAchievements]);

  // 添加游戏时间计时器
  useEffect(() => {
    if (state.isPlaying && !state.isPaused && !state.gameOver) {
      gameTimer.current = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    } else if (state.gameOver) {
      if (gameTimer.current) {
        clearInterval(gameTimer.current);
      }
      // 保存最终游戏记录
      saveGameRecord({
        lastScore: state.score,
        lastLevel: state.level,
        lastLines: state.lines,
        gameTime,
        combo
      });
    }

    return () => {
      if (gameTimer.current) {
        clearInterval(gameTimer.current);
      }
    };
  }, [state.isPlaying, state.isPaused, state.gameOver, state.score, state.level, state.lines, gameTime, combo]);

  return {
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
  };
} 