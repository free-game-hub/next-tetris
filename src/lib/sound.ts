// 检查是否在浏览器环境
const isBrowser = typeof window !== 'undefined';

// 使用 Web Audio API
const AudioContext = isBrowser ? (
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext
) : null;

const hasWebAudioAPI = isBrowser && !!AudioContext && location.protocol.indexOf('http') !== -1;

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
      const response = await fetch('/music.mp3');
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

  play(type: 'start' | 'clear' | 'fall' | 'gameover' | 'rotate' | 'move') {
    if (!isBrowser || !this.enabled || !hasWebAudioAPI) return;

    const source = this.getSource();
    if (!source) return;

    // 音频时间点配置
    const timePoints = {
      start: { offset: 3.7202, duration: 3.6224 },
      clear: { offset: 0, duration: 0.7675 },
      fall: { offset: 1.2558, duration: 0.3546 },
      gameover: { offset: 8.1276, duration: 1.1437 },
      rotate: { offset: 2.2471, duration: 0.0807 },
      move: { offset: 2.9088, duration: 0.1437 }
    };

    const { offset, duration } = timePoints[type];
    source.start(0, offset, duration);
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager(); 