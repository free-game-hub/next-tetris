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
    id: 'first_game',
    name: '初次尝试',
    description: '完成第一局游戏',
    icon: '🎮',
    condition: (stats) => stats.gamesPlayed >= 1
  },
  {
    id: 'score_master',
    name: '分数大师',
    description: '累计得分达到10000分',
    icon: '🏆',
    condition: (stats) => stats.totalScore >= 10000,
    progress: (stats) => Math.min(stats.totalScore / 10000 * 100, 100),
    maxProgress: 100
  },
  {
    id: 'combo_king',
    name: '连消王者',
    description: '达成5连消',
    icon: '👑',
    condition: (stats) => stats.maxCombo >= 5,
    progress: (stats) => Math.min(stats.maxCombo / 5 * 100, 100),
    maxProgress: 100
  },
  {
    id: 'level_master',
    name: '等级大师',
    description: '达到10级',
    icon: '⭐',
    condition: (stats) => stats.maxLevel >= 10,
    progress: (stats) => Math.min(stats.maxLevel / 10 * 100, 100),
    maxProgress: 100
  },
  {
    id: 'speed_demon',
    name: '速度恶魔',
    description: '一局游戏坚持5分钟以上',
    icon: '⚡',
    condition: (stats) => stats.bestTime >= 300,
    progress: (stats) => Math.min(stats.bestTime / 300 * 100, 100),
    maxProgress: 100
  },
  {
    id: 'line_clearer',
    name: '消行专家',
    description: '累计消除100行',
    icon: '🧹',
    condition: (stats) => stats.totalLines >= 100,
    progress: (stats) => Math.min(stats.totalLines / 100 * 100, 100),
    maxProgress: 100
  }
]; 