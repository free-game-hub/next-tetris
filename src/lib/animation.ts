export const animations = {
  // 方块消除动画类名
  clearLine: 'animate-clear-line',
  // 方块落地动画类名
  land: 'animate-land',
  // 游戏结束动画类名
  gameOver: 'animate-game-over',
  // 分数增加动画类名
  scoreIncrease: 'animate-score-increase'
};

// 添加到 tailwind.config.js 的配置
export const tailwindAnimations = {
  keyframes: {
    'clear-line': {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '50%': { transform: 'scale(1.1)', opacity: '0.5' },
      '100%': { transform: 'scale(0)', opacity: '0' }
    },
    'land': {
      '0%': { transform: 'translateY(-2px)' },
      '50%': { transform: 'translateY(2px)' },
      '100%': { transform: 'translateY(0)' }
    },
    'game-over': {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '50%': { transform: 'scale(1.1)', opacity: '0.5' },
      '100%': { transform: 'scale(0)', opacity: '0' }
    },
    'score-increase': {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '50%': { transform: 'scale(1.2)', opacity: '1' },
      '100%': { transform: 'scale(1)', opacity: '1' }
    }
  },
  animation: {
    'clear-line': 'clear-line 0.5s ease-in-out',
    'land': 'land 0.15s ease-in-out',
    'game-over': 'game-over 1s ease-in-out',
    'score-increase': 'score-increase 0.3s ease-in-out'
  }
}; 