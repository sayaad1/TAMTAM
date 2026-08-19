import React, { useEffect, useRef } from 'react';

interface FloatingHeartsCanvasProps {
  interactive?: boolean;
}

export const FloatingHeartsCanvas: React.FC<FloatingHeartsCanvasProps> = ({
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      type: 'heart' | 'star' | 'circle';
    }

    const particles: Particle[] = [];
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#e11d48', '#fbbf24'];

    // Spawn ambient particle
    const spawnParticle = (customX?: number, customY?: number, isClick = false) => {
      const size = isClick ? Math.random() * 16 + 12 : Math.random() * 12 + 6;
      particles.push({
        x: customX !== undefined ? customX : Math.random() * width,
        y: customY !== undefined ? customY : height + 20,
        size,
        speedY: isClick ? -(Math.random() * 3 + 2) : -(Math.random() * 1.2 + 0.5),
        speedX: (Math.random() - 0.5) * (isClick ? 3 : 0.8),
        opacity: isClick ? 1 : Math.random() * 0.5 + 0.3,
        fadeSpeed: isClick ? 0.015 : 0.003,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        type: Math.random() > 0.3 ? 'heart' : Math.random() > 0.5 ? 'star' : 'circle',
      });
    };

    // Initial particles
    for (let i = 0; i < 25; i++) {
      spawnParticle(Math.random() * width, Math.random() * height);
    }

    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight, 0, size);
      // top right curve
      ctx.bezierCurveTo(size, topCurveHeight, size / 2, -topCurveHeight, 0, topCurveHeight);

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos(((18 + i * 90) * Math.PI) / 180) * size, -Math.sin(((18 + i * 90) * Math.PI) / 180) * size);
        ctx.lineTo(Math.cos(((63 + i * 90) * Math.PI) / 180) * (size / 2.5), -Math.sin(((63 + i * 90) * Math.PI) / 180) * (size / 2.5));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Spawn periodic gentle ambient particles
      if (tick % 24 === 0 && particles.length < 50) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        p.opacity -= p.fadeSpeed;

        if (p.opacity <= 0 || p.y < -30) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'star') {
          drawStar(p.x, p.y, p.size * 0.7, p.color, p.opacity);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Click to spawn burst
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      for (let i = 0; i < 6; i++) {
        spawnParticle(clientX, clientY, true);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
