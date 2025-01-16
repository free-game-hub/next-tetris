import React from 'react';
import { ThemeType } from '@/lib/theme';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions: ThemeType[] = ['classic', 'neon', 'retro', 'dark'];

  return (
    <div className="flex items-center gap-2">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeType)}
        className="bg-gray-700/50 text-white rounded-lg px-3 py-2 outline-none"
      >
        {themeOptions.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
} 