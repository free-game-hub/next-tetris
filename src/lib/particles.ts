export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrame: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.animate = this.animate.bind(this);
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // 重力
      p.life--;

      const alpha = p.life / p.maxLife;
      this.ctx.fillStyle = `${p.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      this.ctx.fill();

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(this.animate);
    } else {
      this.animationFrame = null;
    }
  }

  emit(x: number, y: number, count: number, color: string, options = {
    spread: 50,
    speed: 5,
    size: 3,
    life: 60
  }) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * options.speed;
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: options.life,
        maxLife: options.life,
        color,
        size: options.size
      });
    }

    if (!this.animationFrame) {
      this.animate();
    }
  }

  clear() {
    this.particles = [];
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
} 