const STORAGE_KEY = 'TETRIS_RECORD';

interface GameRecord {
  highScore: number;
  lastScore: number;
  lastLevel: number;
  lastLines: number;
  stats: {
    gamesPlayed: number;
    totalScore: number;
    totalLines: number;
    totalTime: number;
    maxCombo: number;
    maxLevel: number;
    bestTime: number;
  };
}

const DEFAULT_RECORD: GameRecord = {
  highScore: 0,
  lastScore: 0,
  lastLevel: 1,
  lastLines: 0,
  stats: {
    gamesPlayed: 0,
    totalScore: 0,
    totalLines: 0,
    totalTime: 0,
    maxCombo: 0,
    maxLevel: 1,
    bestTime: 0
  }
};

export function saveGameRecord(record: Partial<GameRecord> & { gameTime?: number, combo?: number }) {
  try {
    const currentRecord = getGameRecord();
    const { gameTime, combo, ...rest } = record;
    
    const newStats = {
      ...currentRecord.stats,
      gamesPlayed: currentRecord.stats.gamesPlayed + (record.lastScore ? 1 : 0),
      totalScore: currentRecord.stats.totalScore + (record.lastScore || 0),
      totalLines: currentRecord.stats.totalLines + (record.lastLines || 0),
      totalTime: currentRecord.stats.totalTime + (gameTime || 0),
      maxCombo: Math.max(currentRecord.stats.maxCombo, combo || 0),
      maxLevel: Math.max(currentRecord.stats.maxLevel, record.lastLevel || 0),
      bestTime: gameTime ? 
        (currentRecord.stats.bestTime ? 
          Math.min(currentRecord.stats.bestTime, gameTime) : 
          gameTime
        ) : 
        currentRecord.stats.bestTime
    };

    const newRecord = {
      ...currentRecord,
      ...rest,
      highScore: Math.max(currentRecord.highScore, record.lastScore || 0),
      stats: newStats
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecord));
    return newRecord;
  } catch (error) {
    console.error('Failed to save game record:', error);
    return DEFAULT_RECORD;
  }
}

export function getGameRecord(): GameRecord {
  try {
    const record = localStorage.getItem(STORAGE_KEY);
    return record ? JSON.parse(record) : DEFAULT_RECORD;
  } catch (error) {
    console.error('Failed to get game record:', error);
    return DEFAULT_RECORD;
  }
} 