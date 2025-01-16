import React from 'react';
import { soundManager } from '../../lib/sound';

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
  const handleDrop = () => {
    if (!props.isPlaying || props.gameOver) {
      props.onReset();
    } else {
      props.onDrop();
    }
  };

  const directionButtonClass = "w-[8vh] h-[8vh] bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-[0.4vh] border-blue-600";

  return (
    <div className="relative h-screen aspect-[3/5] bg-yellow-400 p-[3%] rounded-[2rem] shadow-2xl mx-auto">
      {/* 顶部装饰点 */}
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

      {/* 左侧装饰点 */}
      <div className="absolute left-[5%] top-[15%] space-y-[2vh]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-[1vh]">
            <div className="w-[1vh] h-[1vh] bg-black" />
            <div className="w-[1vh] h-[1vh] bg-black" />
            {i % 2 === 0 && <div className="w-[1vh] h-[1vh] bg-black" />}
          </div>
        ))}
      </div>

      {/* 右侧装饰点 */}
      <div className="absolute right-[5%] top-[15%] space-y-[2vh]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-[1vh] justify-end">
            <div className="w-[1vh] h-[1vh] bg-black" />
            <div className="w-[1vh] h-[1vh] bg-black" />
            {i % 2 === 0 && <div className="w-[1vh] h-[1vh] bg-black" />}
          </div>
        ))}
      </div>

      {/* 游戏屏幕 */}
      <div className="bg-[#9ca37c] rounded-lg border-[1vh] border-black shadow-inner relative h-[65%] mb-[3%]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="h-full flex flex-col">
          {/* 标题区域 */}
          <div className="text-center text-[2.5vh] font-bold py-[1vh]">俄罗斯方块</div>
          
          {/* 游戏区域 - 占满剩余空间 */}
          <div className="flex-1 px-[2vh]">
            {children}
          </div>
        </div>
      </div>

      {/* 控制按钮区域 */}
      <div className="h-[30%] flex flex-col justify-between">
        {/* 功能按钮 */}
        <div className="grid grid-cols-3 gap-[3vh]">
          <div className="space-y-[1vh]">
            <button 
              onClick={props.onPause}
              className="w-[7vh] h-[7vh] bg-green-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-[0.4vh] border-green-600"
            >
              <span className="text-[2vh]">暂停</span>
            </button>
            <div className="text-[1.6vh] text-center">暂停(P)</div>
          </div>
          <div className="space-y-[1vh]">
            <button 
              onClick={props.onToggleSound}
              className="w-[7vh] h-[7vh] bg-green-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-[0.4vh] border-green-600"
            >
              <span className="text-[2vh]">
                {soundManager.isEnabled() ? '音效开' : '音效关'}
              </span>
            </button>
            <div className="text-[1.6vh] text-center">音效(S)</div>
          </div>
          <div className="space-y-[1vh]">
            <button 
              onClick={props.onReset}
              className="w-[7vh] h-[7vh] bg-red-500 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-[0.4vh] border-red-600"
            >
              <span className="text-[2vh]">重玩</span>
            </button>
            <div className="text-[1.6vh] text-center">重玩(R)</div>
          </div>
        </div>

        {/* 方向控制 */}
        <div className="flex justify-between items-center px-[2vh]">
          <button 
            onClick={handleDrop}
            className="w-[12vh] h-[12vh] bg-blue-500 rounded-full shadow-lg active:shadow-md transform-gpu active:translate-y-[2px] transition-all border-[0.4vh] border-blue-600"
          >
            <span className="text-[2.2vh]">
              {!props.isPlaying || props.gameOver ? '开始' : '掉落'}
            </span>
            <div className="text-[1.6vh]">(SPACE)</div>
          </button>

          <div className="relative w-[22vh] h-[22vh]">
            <button 
              onClick={props.onRotate}
              className={`absolute top-0 left-1/2 -translate-x-1/2 ${directionButtonClass}`}
            >
              <span className="text-[2vh]">旋转</span>
            </button>
            <button 
              onClick={props.onMoveDown}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${directionButtonClass}`}
            >
              <span className="text-[2vh]">下移</span>
            </button>
            <button 
              onClick={props.onMoveLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 ${directionButtonClass}`}
            >
              <span className="text-[2vh]">左移</span>
            </button>
            <button 
              onClick={props.onMoveRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 ${directionButtonClass}`}
            >
              <span className="text-[2vh]">右移</span>
            </button>
            {/* 十字装饰 */}
            <div className="absolute inset-[25%] flex items-center justify-center">
              <div className="w-full h-[0.5vh] bg-black/20" />
              <div className="absolute w-[0.5vh] h-full bg-black/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 