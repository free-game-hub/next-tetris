import React from 'react';

interface KeyboardGuideProps {
  show: boolean;
  onClose: () => void;
}

export function KeyboardGuide({ show, onClose }: KeyboardGuideProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">Keyboard Controls</h2>
        <ul className="space-y-2">
          <li>← / A: Move Left</li>
          <li>→ / D: Move Right</li>
          <li>↓ / S: Move Down</li>
          <li>↑ / W: Rotate</li>
          <li>Space: Quick Drop</li>
          <li>P: Pause Game</li>
          <li>R: Restart Game</li>
        </ul>
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Got it
        </button>
      </div>
    </div>
  );
} 