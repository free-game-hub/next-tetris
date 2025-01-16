import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface StatisticsProps {
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

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  const { currentTheme } = useTheme();
  
  return (
    <div className="flex justify-between items-center py-2">
      <span className={currentTheme.text.secondary}>{label}</span>
      <span className={`${currentTheme.text.primary} font-medium`}>{value}</span>
    </div>
  );
}

export function Statistics({ stats }: StatisticsProps) {
  const { currentTheme } = useTheme();
  const avgScore = stats.gamesPlayed ? Math.round(stats.totalScore / stats.gamesPlayed) : 0;
  const avgTime = stats.gamesPlayed ? Math.round(stats.totalTime / stats.gamesPlayed) : 0;

  return (
    <div className={`${currentTheme.background} p-4 rounded-lg`}>
      <h3 className={`${currentTheme.text.primary} text-lg font-bold mb-4`}>
        游戏统计
      </h3>
      
      <div className="space-y-1 text-sm">
        <StatItem label="游戏场数" value={stats.gamesPlayed} />
        <StatItem label="最高等级" value={stats.maxLevel} />
        <StatItem label="最多连消" value={stats.maxCombo} />
        <StatItem label="平均分数" value={avgScore} />
        <StatItem label="总消行数" value={stats.totalLines} />
        <StatItem label="最佳时间" value={formatTime(stats.bestTime)} />
        <StatItem label="平均时间" value={formatTime(avgTime)} />
      </div>
    </div>
  );
} 