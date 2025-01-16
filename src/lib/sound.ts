interface Sound {
  move: HTMLAudioElement;
  rotate: HTMLAudioElement;
  drop: HTMLAudioElement;
  clear: HTMLAudioElement;
  gameOver: HTMLAudioElement;
}

class SoundManager {
  private sounds: Partial<Sound> = {};
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.sounds = {
        move: new Audio('/sounds/move.mp3'),
        rotate: new Audio('/sounds/rotate.mp3'),
        drop: new Audio('/sounds/drop.mp3'),
        clear: new Audio('/sounds/clear.mp3'),
        gameOver: new Audio('/sounds/gameover.mp3')
      };

      // 预加载音效
      Object.values(this.sounds).forEach(sound => {
        sound?.load();
      });
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  play(soundName: keyof Sound) {
    if (!this.enabled || !this.sounds[soundName]) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // 忽略自动播放策略导致的错误
      });
    }
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager(); 