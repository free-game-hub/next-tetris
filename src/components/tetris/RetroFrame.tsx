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

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // 基于视口宽度计算游戏机高度
      const baseHeight = windowHeight;
      const baseWidth = baseHeight * 0.6; // 3:5 aspect ratio
      
      // 计算缩放比例
      const scaleX = windowWidth / baseWidth;
      const scaleY = windowHeight / baseHeight;
      
      // 使用较小的缩放比例
      const newScale = Math.min(scaleX, scaleY, 1);
      
      setScale(newScale);
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

  const directionButtonClass = "w-[8vh] h-[8vh] bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-[0.4vh] border-blue-600";

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div 
        ref={containerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          height: '100vh',
          width: '60vh', // 3:5 aspect ratio
          maxHeight: '100vh',
          position: 'relative',
        }}
        className="bg-yellow-400 p-[3%] rounded-[2rem] shadow-2xl"
      >
        {/* Top decoration dots */}
        <div className="absolute left-[10%] right-[10%] top-[5%] flex justify-between">
          <div className="flex gap-[1vh]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[1vh] h-[1vh] bg-black" />
            ))}
          </div>
          <div className="flex gap-[1vh]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[1vh] h-[1vh] bg-black" />
            ))}
          </div>
        </div>

        {/* Left decoration dots */}
        <div className="absolute left-[5%] top-[15%] space-y-[2vh]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-[1vh]">
              <div className="w-[1vh] h-[1vh] bg-black" />
              <div className="w-[1vh] h-[1vh] bg-black" />
              {i % 2 === 0 && <div className="w-[1vh] h-[1vh] bg-black" />}
            </div>
          ))}
        </div>

        {/* Right decoration dots */}
        <div className="absolute right-[5%] top-[15%] space-y-[2vh]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-[1vh] justify-end">
              <div className="w-[1vh] h-[1vh] bg-black" />
              <div className="w-[1vh] h-[1vh] bg-black" />
              {i % 2 === 0 && <div className="w-[1vh] h-[1vh] bg-black" />}
            </div>
          ))}
        </div>

        {/* Game screen */}
        <div className="bg-[#9ca37c] rounded-lg border-[1vh] border-black shadow-inner relative h-[65%] mb-[3%]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="h-full flex flex-col">
            {/* Title area */}
            <div className="text-center text-[2.5vh] font-bold py-[1vh]">TETRIS</div>
            
            {/* Game area */}
            <div className="flex-1 px-[2vh]">
              {children}
            </div>
          </div>
        </div>

        {/* Control buttons area */}
        <div className="h-[30%] flex flex-col justify-between">
          {/* Function buttons */}
          <div className="flex justify-between px-[2vh]">
            <div className="text-center">
              <button 
                onClick={props.onPause}
                className="w-[7vh] h-[7vh] bg-green-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-[0.4vh] border-green-600"
              >
                <span className="text-[2vh]">Pause</span>
              </button>
              <div className="text-[1.6vh] text-center">Pause(P)</div>
            </div>

            <div className="text-center">
              <button 
                onClick={props.onToggleSound}
                className="w-[7vh] h-[7vh] bg-yellow-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-[0.4vh] border-yellow-600"
              >
                <span className="text-[2vh]">Sound</span>
              </button>
              <div className="text-[1.6vh] text-center">Sound(S)</div>
            </div>

            <div className="text-center">
              <button 
                onClick={props.onReset}
                className="w-[7vh] h-[7vh] bg-red-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-[0.4vh] border-red-600"
              >
                <span className="text-[2vh]">Reset</span>
              </button>
              <div className="text-[1.6vh] text-center">Reset(R)</div>
            </div>
          </div>

          {/* Direction controls */}
          <div className="flex justify-between items-center px-[2vh]">
            <button 
              onClick={handleDrop}
              className="w-[12vh] h-[12vh] bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-[0.4vh] border-blue-600"
            >
              <span className="text-[2.2vh]">
                {!props.isPlaying || props.gameOver ? 'Start' : 'Drop'}
              </span>
              <div className="text-[1.6vh]">(SPACE)</div>
            </button>

            <div className="relative w-[22vh] h-[22vh]">
              <button 
                onClick={props.onRotate}
                className={`absolute top-0 left-1/2 -translate-x-1/2 ${directionButtonClass}`}
              >
                <span className="text-[2vh]">Rotate</span>
              </button>
              <button 
                onClick={props.onMoveDown}
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${directionButtonClass}`}
              >
                <span className="text-[2vh]">Down</span>
              </button>
              <button 
                onClick={props.onMoveLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 ${directionButtonClass}`}
              >
                <span className="text-[2vh]">Left</span>
              </button>
              <button 
                onClick={props.onMoveRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 ${directionButtonClass}`}
              >
                <span className="text-[2vh]">Right</span>
              </button>
              {/* Cross decoration */}
              <div className="absolute inset-[25%] flex items-center justify-center">
                <div className="w-full h-[0.5vh] bg-black/20" />
                <div className="absolute w-[0.5vh] h-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 