// 检查是否在浏览器环境
const isBrowser = typeof window !== 'undefined';

// 定义浏览器特定的 AudioContext 接口
interface LegacyAudioContext {
  new (): AudioContext;
}

interface LegacyWindow extends Window {
  webkitAudioContext?: LegacyAudioContext;
  mozAudioContext?: LegacyAudioContext;
  oAudioContext?: LegacyAudioContext;
  msAudioContext?: LegacyAudioContext;
}

// 使用 Web Audio API
const AudioContext = isBrowser ? (
  (window.AudioContext || 
   (window as LegacyWindow).webkitAudioContext ||
   (window as LegacyWindow).mozAudioContext ||
   (window as LegacyWindow).oAudioContext ||
   (window as LegacyWindow).msAudioContext) as LegacyAudioContext
) : null;

const hasWebAudioAPI = isBrowser && !!AudioContext && location.protocol.indexOf('http') !== -1;

// 定义音效类型
type SoundType = 'start' | 'clear' | 'fall' | 'gameOver' | 'rotate' | 'move' | 'achievement' | 'drop';

class SoundManager {
  private context: AudioContext | null = null;
  private soundBuffer: AudioBuffer | null = null;
  private enabled: boolean = true;

  constructor() {
    // 只在浏览器环境下初始化音频上下文
    if (isBrowser && hasWebAudioAPI) {
      this.context = new AudioContext();
      this.loadSound();
    }
  }

  private async loadSound() {
    try {
      const response = await fetch('/next-tetris/music.mp3');
      const arrayBuffer = await response.arrayBuffer();
      if (this.context) {
        this.soundBuffer = await this.context.decodeAudioData(arrayBuffer);
      }
    } catch (error) {
      console.error('音频加载错误:', error);
    }
  }

  private getSource() {
    if (!this.context || !this.soundBuffer) return null;
    const source = this.context.createBufferSource();
    source.buffer = this.soundBuffer;
    source.connect(this.context.destination);
    return source;
  }

  toggle() {
    this.enabled = !this.enabled;
  }

  play(type: SoundType) {
    if (!isBrowser || !this.enabled || !hasWebAudioAPI) return;

    const source = this.getSource();
    if (!source) return;

    // 音频时间点配置
    const timePoints: Record<SoundType, { offset: number; duration: number }> = {
      start: { offset: 3.7202, duration: 3.6224 },
      clear: { offset: 0, duration: 0.7675 },
      fall: { offset: 1.2558, duration: 0.3546 },
      gameOver: { offset: 8.1276, duration: 1.1437 },
      rotate: { offset: 2.2471, duration: 0.0807 },
      move: { offset: 2.9088, duration: 0.1437 },
      achievement: { offset: 0, duration: 0.7675 },
      drop: { offset: 1.2558, duration: 0.3546 }
    };

    try {
      const { offset, duration } = timePoints[type];
      source.start(0, offset, duration);
    } catch (error) {
      console.error(`播放音效错误: ${type}`, error);
    }
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager(); 