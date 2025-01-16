import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Achievement, GameStats } from '@/lib/achievements';

interface AchievementItemProps {
  achievement: Achievement;
  stats: GameStats;
  isNew?: boolean;
}

function AchievementItem({ achievement, stats, isNew }: AchievementItemProps) {
  const { currentTheme } = useTheme();
  const completed = achievement.condition(stats);
  const progress = achievement.progress?.(stats) ?? (completed ? 100 : 0);

  return (
    <div 
      className={`
        relative p-4 rounded-lg
        ${completed ? currentTheme.block.fixed : 'bg-gray-800'}
        ${isNew ? 'animate-bounce' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{achievement.icon}</span>
        <div>
          <h4 className={`font-bold ${currentTheme.text.primary}`}>
            {achievement.name}
          </h4>
          <p className={`text-sm ${currentTheme.text.secondary}`}>
            {achievement.description}
          </p>
        </div>
      </div>

      {achievement.maxProgress && (
        <div className="mt-2">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-xs mt-1 text-gray-400">
            {Math.round(progress)}%
          </div>
        </div>
      )}

      {isNew && (
        <div className="absolute -top-1 -right-1">
          <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-full">
            新!
          </span>
        </div>
      )}
    </div>
  );
}

interface AchievementsProps {
  achievements: Achievement[];
  stats: GameStats;
  newAchievements: string[];
}

export function Achievements({ achievements, stats, newAchievements }: AchievementsProps) {
  const { currentTheme } = useTheme();
  const completedCount = achievements.filter(a => a.condition(stats)).length;

  return (
    <div className={`${currentTheme.background} p-4 rounded-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`${currentTheme.text.primary} text-lg font-bold`}>
          成就
        </h3>
        <span className={`${currentTheme.text.secondary} text-sm`}>
          {completedCount}/{achievements.length}
        </span>
      </div>

      <div className="space-y-3">
        {achievements.map(achievement => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            stats={stats}
            isNew={newAchievements.includes(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
} 