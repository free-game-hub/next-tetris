import { BlockShape, BlockType, GameState } from './types';

export const BLOCK_SIZE = 20;
export const MATRIX_WIDTH = 10;
export const MATRIX_HEIGHT = 20;

export const getResponsiveBlockSize = (containerHeight: number): number => {
  const maxBlockSize = Math.floor((containerHeight * 0.7) / MATRIX_HEIGHT);
  return Math.min(maxBlockSize, BLOCK_SIZE);
};

export const SHAPES: Record<BlockType, BlockShape> = {
  I: {
    shape: [[1, 1, 1, 1]],
    origin: [[-1, 1], [1, -1]]
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    origin: [[0, 0]]
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    origin: [[0, 0]]
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    origin: [[0, 0]]
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    origin: [[0, 0]]
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    origin: [[0, 0]]
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    origin: [[0, 0], [1, 0], [-1, 1], [0, -1]]
  }
};

export const SPEEDS = [800, 650, 500, 370, 250, 160];
export const POINTS = [100, 300, 700, 1500];

export const INITIAL_STATE: GameState = {
  matrix: Array(MATRIX_HEIGHT).fill(null).map(() => 
    Array(MATRIX_WIDTH).fill(0)
  ),
  currentBlock: null,
  nextBlock: 'I',
  score: 0,
  level: 1,
  lines: 0,
  isPlaying: false,
  isPaused: false,
  gameOver: false
}; 