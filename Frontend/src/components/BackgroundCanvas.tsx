import React, { useEffect, useRef } from 'react';

export interface BackgroundCanvasProps {
  theme?: 'cyberpunk' | 'minimal' | 'indigo' | 'cyan' | 'purple';
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ theme = 'cyan' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  // Get RGB colors for canvas drawing based on active theme
  const getThemeColor = () => {
    switch (theme) {
      case 'cyberpunk':
        return { r: 139, g: 92, b: 246 }; // Purple accent
      case 'minimal':
        return { r: 156, g: 163, b: 175 }; // Silver/Gray accent
      case 'indigo':
        return { r: 79, g: 70, b: 229 }; // Indigo accent
      case 'cyan':
      default:
        return { r: 6, g: 182, b: 212 }; // Cyan accent
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic Particle Class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      speedModifier: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 2 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.speedModifier = Math.random() * 0.4 + 0.6;
      }

      update() {
        this.x += this.vx * this.speedModifier;
        this.y += this.vy * this.speedModifier;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Magnetic attraction to cursor
        const mouse = mouseRef.current;
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const force = (220 - dist) / 220;
            this.x += (dx / dist) * force * 0.35;
            this.y += (dy / dist) * force * 0.35;
          }
        }
      }

      draw(c: CanvasRenderingContext2D, rgb: { r: number; g: number; b: number }) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha})`;
        c.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha * 0.5})`;
        c.shadowBlur = 4;
        c.fill();
        c.shadowBlur = 0; // Reset shadow for efficiency
      }
    }

    // Instantiation
    const particles: Particle[] = [];
    const calculateParticleCount = () => Math.min(85, Math.floor((window.innerWidth * window.innerHeight) / 16000));
    let particleCount = calculateParticleCount();
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Update particle count on size shift
      const nextCount = calculateParticleCount();
      if (nextCount > particles.length) {
        for (let i = particles.length; i < nextCount; i++) {
          particles.push(new Particle());
        }
      } else if (nextCount < particles.length) {
        particles.splice(nextCount);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse position for smooth trailing halo
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const activeColor = getThemeColor();

      // Mouse interactive radial glow spot
      if (mouse.active) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 250);
        glow.addColorStop(0, `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, 0.085)`);
        glow.addColorStop(1, 'rgba(5, 8, 22, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw global perspective grid ambient glow
      const gridGlow = ctx.createRadialGradient(width / 2, height * 0.8, 50, width / 2, height * 0.8, width * 0.7);
      gridGlow.addColorStop(0, `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, 0.05)`);
      gridGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');
      ctx.fillStyle = gridGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw connections & update particles
      particles.forEach((p, idx) => {
        p.update();
        p.draw(ctx, activeColor);

        // Grid-line connection mapping
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // CSS classes for color theme grids
  const getGridColorClass = () => {
    switch (theme) {
      case 'cyberpunk':
        return '[--grid-color:rgba(139,92,246,0.06)]';
      case 'minimal':
        return '[--grid-color:rgba(156,163,175,0.05)]';
      case 'indigo':
        return '[--grid-color:rgba(79,70,229,0.06)]';
      case 'cyan':
      default:
        return '[--grid-color:rgba(6,182,212,0.06)]';
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-bg-dark">
      {/* 3D Perspective Grid Background overlay */}
      <div className={`absolute inset-x-0 bottom-0 h-[50vh] perspective-grid opacity-35 ${getGridColorClass()}`}>
        <div 
          className="w-[200%] h-full perspective-grid-inner left-[-50%] absolute" 
          style={{ 
            backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transformOrigin: 'top center'
          }} 
        />
      </div>
      
      {/* Node connectivity canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
