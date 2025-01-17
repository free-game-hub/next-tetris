import React, {useEffect, useRef, useState} from 'react';

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
    highScore: number;
    lines: number;
    level: number;
    gameTime: number;
    combo: number;
    nextBlock: React.ReactNode;
}

export function RetroFrame({children, ...props}: RetroFrameProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [showQR, setShowQR] = useState(false);

    // Fixed dimensions
    const CONSOLE_WIDTH = 400;  // Console width
    const CONSOLE_HEIGHT = 667; // Console height (400 / 0.6)
    const MIN_WIDTH_FOR_QR = 700; // Minimum width to show QR code

    useEffect(() => {
        const updateScale = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calculate scale ratio
            const scaleX = viewportWidth / CONSOLE_WIDTH;
            const scaleY = viewportHeight / CONSOLE_HEIGHT;

            // Use the smaller scale ratio
            setScale(Math.min(scaleX, scaleY, 1));

            // Show QR code based on viewport width
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

    // Unified function button style
    const functionButtonClass = "w-10 h-10 bg-opacity-90 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-2 flex items-center justify-center";

    // Unified direction button style
    const directionButtonClass = "w-14 h-14 bg-blue-500 bg-opacity-90 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-2 border-blue-600 flex items-center justify-center";

    return (
        <div className="fixed inset-0 flex items-start justify-center">
            {/* QR code area */}
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
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="font-medium">GitHub</span>
                    </a>
                </div>
            )}

            {/* Game console body */}
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
                {/* Decorative points */}
                <div className="absolute left-[10%] right-[10%] top-[5%] flex justify-between">
                    <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-black"/>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-black"/>
                        ))}
                    </div>
                </div>

                {/* Game screen */}
                <div className="bg-[#9ca37c] rounded-lg border-4 border-black shadow-inner relative h-[60%] mb-[3%]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"/>
                    <div className="h-full flex flex-col">
                        <div className="text-center text-2xl font-bold py-2">TETRIS</div>
                        <div className="flex-1 px-4">{children}</div>
                    </div>
                </div>

                {/* Control buttons area */}
                <div className="absolute grid grid-cols-2 gap-4 bottom-8 inset-x-4 h-[200px]">
                    <div className="flex flex-col justify-center">
                        {/* Function buttons */}
                        <div className="flex justify-between mb-4">
                            <div className="text-center">
                                <button
                                    onClick={props.onPause}
                                    className={`${functionButtonClass} bg-green-500 border-green-600`}
                                >
                                    <span className="text-xs">P</span>
                                </button>
                                <div className="text-[10px] mt-1">Pause(P)</div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={props.onToggleSound}
                                    className={`${functionButtonClass} bg-yellow-500 border-yellow-600`}
                                >
                                    <span className="text-xs">S</span>
                                </button>
                                <div className="text-[10px] mt-1">Sound(S)</div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={props.onReset}
                                    className={`${functionButtonClass} bg-red-500 border-red-600`}
                                >
                                    <span className="text-xs">R</span>
                                </button>
                                <div className="text-[10px] mt-1">Reset(R)</div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleDrop}
                                className="w-28 h-28 bg-blue-500 bg-opacity-90 rounded-full shadow-lg active:shadow-md active:translate-y-0.5 transition-all border-2 border-blue-600 flex flex-col items-center justify-center"
                            >
                                <div className="text-[10px]">Drop</div>
                                <div className="text-[10px]">(SPACE)</div>
                            </button>
                        </div>
                    </div>

                    {/* Direction controls */}
                    <div className="flex justify-between items-center">
                        <div className="relative w-44 h-44">
                            {/* Up - Rotate */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40%] w-[40%]">
                                <button
                                    onClick={props.onRotate}
                                    className={`${directionButtonClass} w-full relative`}
                                >
                                    <div className="text-[10px]">Rotate</div>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 
                                        border-[6px] border-transparent border-t-black/20" />
                                </button>
                            </div>

                            {/* Down */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[40%] w-[40%]">
                                <button
                                    onClick={props.onMoveDown}
                                    className={`${directionButtonClass} w-full relative`}
                                >
                                    <div className="text-[10px]">Down</div>
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 
                                        border-[6px] border-transparent border-b-black/20" />
                                </button>
                            </div>

                            {/* Left */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[40%] w-[40%]">
                                <button
                                    onClick={props.onMoveLeft}
                                    className={`${directionButtonClass} w-full relative`}
                                >
                                    <div className="text-[10px]">Left</div>
                                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 
                                        border-[6px] border-transparent border-l-black/20" />
                                </button>
                            </div>

                            {/* Right */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[40%] w-[40%]">
                                <button
                                    onClick={props.onMoveRight}
                                    className={`${directionButtonClass} w-full relative`}
                                >
                                    <div className="text-[10px]">Right</div>
                                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 
                                        border-[6px] border-transparent border-r-black/20" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 