import { BlockType, Point } from './types';
import { SHAPES, MATRIX_WIDTH, MATRIX_HEIGHT } from './constants';

// 获取随机方块类型
export function getRandomBlock(): BlockType {
  const blocks: BlockType[] = ['I', 'L', 'J', 'Z', 'S', 'O', 'T'];
  return blocks[Math.floor(Math.random() * blocks.length)];
}

// 检查方块是否可以移动到指定位置
export function canMove(
  position: [number, number],
  shape: number[][],
  matrix: number[][]
): boolean {
  const [row, col] = position;
  
  return shape.every((shapeRow, rowIndex) =>
    shapeRow.every((cell, colIndex) => {
      if (cell === 0) return true;
      
      const matrixRow = row + rowIndex;
      const matrixCol = col + colIndex;
      
      // 检查边界
      if (
        matrixCol < 0 || 
        matrixCol >= MATRIX_WIDTH ||
        matrixRow >= MATRIX_HEIGHT
      ) {
        return false;
      }
      
      // 检查碰撞
      if (matrixRow >= 0 && matrix[matrixRow][matrixCol] !== 0) {
        return false;
      }
      
      return true;
    })
  );
}

// 将方块合并到矩阵中
export function mergeBlock(
  matrix: number[][],
  shape: number[][],
  position: [number, number]
): number[][] {
  const newMatrix = matrix.map(row => [...row]);
  const [blockRow, blockCol] = position;

  shape.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell !== 0) {
        const matrixRow = blockRow + rowIndex;
        const matrixCol = blockCol + colIndex;
        if (matrixRow >= 0) {
          newMatrix[matrixRow][matrixCol] = 1;
        }
      }
    });
  });

  return newMatrix;
}

// 旋转方块
export function rotateShape(shape: number[][]): number[][] {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array(cols).fill(0).map(() => Array(rows).fill(0));
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      rotated[col][rows - 1 - row] = shape[row][col];
    }
  }
  
  return rotated;
}

// 检查并清除已完成的行
export function clearLines(matrix: number[][]): {
  newMatrix: number[][],
  linesCleared: number
} {
  const newMatrix = matrix.filter(row => !row.every(cell => cell === 1));
  const linesCleared = matrix.length - newMatrix.length;
  
  // 在顶部添加新的空行
  const emptyRows = Array(linesCleared)
    .fill(0)
    .map(() => Array(MATRIX_WIDTH).fill(0));
    
  return {
    newMatrix: [...emptyRows, ...newMatrix],
    linesCleared
  };
} 