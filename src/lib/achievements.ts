export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: GameStats) => boolean;
  progress?: (stats: GameStats) => number;
  maxProgress?: number;
}

export interface GameStats {
  totalScore: number;
  maxCombo: number;
  gamesPlayed: number;
  totalLines: number;
  maxLevel: number;
  bestTime: number;
}

export const achievements: Achievement[] = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Clear your first line',
    icon: '🎯',
    condition: (stats) => stats.totalLines > 0
  },
  {
    id: 'combo_master',
    name: 'Combo Master',
    description: 'Achieve a 5x combo',
    icon: '🔥',
    condition: (stats) => stats.maxCombo >= 5,
    progress: (stats) => Math.min(stats.maxCombo / 5 * 100, 100),
    maxProgress: 100
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Play for 5 minutes in one game',
    icon: '⚡',
    condition: (stats) => stats.bestTime >= 300,
    progress: (stats) => Math.min(stats.bestTime / 300 * 100, 100),
    maxProgress: 100
  },
  {
    id: 'line_clearer',
    name: 'Line Clearer',
    description: 'Clear 100 lines in total',
    icon: '🧹',
    condition: (stats) => stats.totalLines >= 100,
    progress: (stats) => Math.min(stats.totalLines / 100 * 100, 100),
    maxProgress: 100
  }
]; 