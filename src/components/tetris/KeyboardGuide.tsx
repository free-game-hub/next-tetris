import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface KeyGuideProps {
  keyName: string;
  action: string;
}

function KeyGuide({ keyName, action }: KeyGuideProps) {
  const { currentTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <kbd className="px-2 py-1 bg-gray-700/50 rounded border border-gray-600 min-w-[32px] text-center">
        {keyName}
      </kbd>
      <span className={`${currentTheme.text.secondary}`}>{action}</span>
    </div>
  );
}

interface KeyboardGuideProps {
  show: boolean;
  onClose: () => void;
}

export function KeyboardGuide({ show, onClose }: KeyboardGuideProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">键盘控制说明</h2>
        <ul className="space-y-2">
          <li>← / A：左移</li>
          <li>→ / D：右移</li>
          <li>↓ / S：下移</li>
          <li>↑ / W：旋转</li>
          <li>空格：快速下落</li>
          <li>P：暂停</li>
          <li>R：重新开始</li>
        </ul>
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          了解了
        </button>
      </div>
    </div>
  );
} 