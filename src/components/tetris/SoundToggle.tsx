import React from 'react';
import { soundManager } from '@/lib/sound';

export function SoundToggle() {
  const [enabled, setEnabled] = React.useState(soundManager.isEnabled());

  const toggleSound = () => {
    soundManager.toggle();
    setEnabled(soundManager.isEnabled());
  };

  return (
    <button
      onClick={toggleSound}
      className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50"
      title={enabled ? '关闭音效' : '开启音效'}
    >
      {enabled ? (
        <span className="text-xl">🔊</span>
      ) : (
        <span className="text-xl">🔇</span>
      )}
    </button>
  );
} 