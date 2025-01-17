import React, { useEffect, useRef, useState } from 'react';

interface RetroFrameProps {
  children: React.ReactNode;
  onPause: () => void;
  onReset: () => void;
  onToggleSound: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onDrop: () => void;
  isPlaying: boolean;
  gameOver: boolean;
}

export function RetroFrame({ children, ...props }: RetroFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [showQR, setShowQR] = useState(false);

  // 固定尺寸
  const CONSOLE_WIDTH = 400;  // 游戏机宽度
  const CONSOLE_HEIGHT = 667; // 游戏机高度 (400 / 0.6)
  const MIN_WIDTH_FOR_QR = 600; // 显示二维码的最小宽度

  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // 计算缩放比例
      const scaleX = viewportWidth / CONSOLE_WIDTH;
      const scaleY = viewportHeight / CONSOLE_HEIGHT;
      
      // 使用较小的缩放比例
      setScale(Math.min(scaleX, scaleY, 1));

      // 根据视口宽度决定是否显示二维码
      setShowQR(viewportWidth >= MIN_WIDTH_FOR_QR);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleDrop = () => {
    if (!props.isPlaying || props.gameOver) {
      props.onReset();
    } else {
      props.onDrop();
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center">
      {/* 左侧二维码区域 */}
      {showQR && (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img 
              src="/next-tetris/site_qrcode.png"
              alt="QR Code"
              className="w-32 h-32"
            />
          </div>
          <a 
            href="https://github.com/free-game-hub/next-tetris" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="font-medium">GitHub</span>
          </a>
        </div>
      )}

      {/* 游戏机主体 */}
      <div 
        ref={containerRef}
        style={{
          width: CONSOLE_WIDTH,
          height: CONSOLE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
        className="bg-yellow-400 p-6 rounded-[32px] shadow-2xl relative overflow-hidden"
      >
        {/* 装饰点 */}
        <div className="absolute left-[10%] right-[10%] top-[5%] flex justify-between">
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-black" />
            ))}
          </div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-black" />
            ))}
          </div>
        </div>

        {/* 游戏屏幕 */}
        <div className="bg-[#9ca37c] rounded-lg border-4 border-black shadow-inner relative h-[60%] mb-[3%]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="h-full flex flex-col">
            <div className="text-center text-2xl font-bold py-2">TETRIS</div>
            <div className="flex-1 px-4">{children}</div>
          </div>
        </div>

        {/* 控制按钮区域 - 位置上移 */}
        <div className="absolute bottom-12 inset-x-4 h-[200px]">
          {/* 功能按钮 */}
          <div className="flex justify-between mb-8">
            <div className="text-center">
              <button 
                onClick={props.onPause}
                className="w-12 h-12 bg-green-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-2 border-green-600"
              >
                <span className="text-xs">Pause</span>
              </button>
              <div className="text-[10px] mt-0.5">Pause(P)</div>
            </div>

            <div className="text-center">
              <button 
                onClick={props.onToggleSound}
                className="w-12 h-12 bg-yellow-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-2 border-yellow-600"
              >
                <span className="text-xs">Sound</span>
              </button>
              <div className="text-[10px] mt-0.5">Sound(S)</div>
            </div>

            <div className="text-center">
              <button 
                onClick={props.onReset}
                className="w-12 h-12 bg-red-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-2 border-red-600"
              >
                <span className="text-xs">Reset</span>
              </button>
              <div className="text-[10px] mt-0.5">Reset(R)</div>
            </div>
          </div>

          {/* 方向控制 */}
          <div className="flex justify-between items-center">
            <button 
              onClick={handleDrop}
              className="w-16 h-16 bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-2 border-blue-600"
            >
              <span className="text-xs block">
                {!props.isPlaying || props.gameOver ? 'Start' : 'Drop'}
              </span>
              <div className="text-[10px]">(SPACE)</div>
            </button>

            <div className="relative w-32 h-32">
              <button 
                onClick={props.onRotate}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-2 border-blue-600"
              >
                <span className="text-xs">Rotate</span>
              </button>
              <button 
                onClick={props.onMoveDown}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-2 border-blue-600"
              >
                <span className="text-xs">Down</span>
              </button>
              <button 
                onClick={props.onMoveLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-2 border-blue-600"
              >
                <span className="text-xs">Left</span>
              </button>
              <button 
                onClick={props.onMoveRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-2 border-blue-600"
              >
                <span className="text-xs">Right</span>
              </button>
              {/* 十字装饰 */}
              <div className="absolute inset-[25%] flex items-center justify-center">
                <div className="w-full h-0.5 bg-black/20" />
                <div className="absolute w-0.5 h-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 