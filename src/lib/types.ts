export type BlockType = 'I' | 'L' | 'J' | 'Z' | 'S' | 'O' | 'T';

export interface BlockShape {
  shape: number[][];
  origin: [number, number][];
}

export interface GameState {
  matrix: number[][];
  currentBlock: {
    type: BlockType;
    shape: number[][];
    position: [number, number];
    rotation: number;
  } | null;
  nextBlock: BlockType;
  score: number;
  level: number;
  lines: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
}

export interface Point {
  x: number;
  y: number;
} 