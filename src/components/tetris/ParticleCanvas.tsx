import React, { useEffect, useRef } from 'react';
import { ParticleSystem } from '@/lib/particles';

interface ParticleCanvasProps {
  onInit: (particleSystem: ParticleSystem) => void;
}

export function ParticleCanvas({ onInit }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const particleSystem = new ParticleSystem(canvas);
    onInit(particleSystem);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      particleSystem.clear();
    };
  }, [onInit]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
} 