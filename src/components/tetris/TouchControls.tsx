import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TouchControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onDrop: () => void;
}

function TouchButton({ 
  icon, 
  onClick, 
  label,
  large = false 
}: { 
  icon: string; 
  onClick: () => void; 
  label: string;
  large?: boolean;
}) {
  const { currentTheme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`
        relative
        ${large ? 'p-6' : 'p-4'}
        rounded-full
        ${currentTheme.block.active}
        active:opacity-75
        transition-all
        duration-150
        transform
        active:scale-95
        shadow-lg
        active:shadow-md
        focus:outline-none
      `}
      aria-label={label}
    >
      <span className="text-2xl">{icon}</span>
    </button>
  );
}

export function TouchControls({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onDrop
}: TouchControlsProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 pb-8">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {/* 上方按钮 */}
          <div className="col-span-3 flex justify-center mb-2">
            <TouchButton
              icon="↻"
              onClick={onRotate}
              label="旋转"
              large
            />
          </div>

          {/* 中间按钮 */}
          <div className="flex justify-center">
            <TouchButton
              icon="←"
              onClick={onMoveLeft}
              label="左移"
            />
          </div>
          <div className="flex justify-center">
            <TouchButton
              icon="⤓"
              onClick={onDrop}
              label="直接落地"
              large
            />
          </div>
          <div className="flex justify-center">
            <TouchButton
              icon="→"
              onClick={onMoveRight}
              label="右移"
            />
          </div>

          {/* 下方按钮 */}
          <div className="col-span-3 flex justify-center mt-2">
            <TouchButton
              icon="↓"
              onClick={onMoveDown}
              label="加速下落"
              large
            />
          </div>
        </div>
      </div>
    </div>
  );
} 