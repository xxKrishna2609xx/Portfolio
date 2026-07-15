import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover/fine pointer (e.g. not a mobile screen)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    // Dynamic hover checks
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive');

      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    let animationFrameId: number;

    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      
      if (dot && ring) {
        // Position dot instantly
        dot.style.left = `${mouseCoords.current.x}px`;
        dot.style.top = `${mouseCoords.current.y}px`;

        // Lerp ring coordinate math (spring decay offset)
        ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * 0.16;
        ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * 0.16;
        
        ring.style.left = `${ringCoords.current.x}px`;
        ring.style.top = `${ringCoords.current.y}px`;
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Return null if on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <>
      {/* Tiny central core */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot pointer-events-none fixed z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 ${
          clicked ? 'scale-[0.6] bg-brand-purple' : hovered ? 'scale-[1.8] bg-brand-indigo' : 'scale-100 bg-brand-cyan'
        }`}
        style={{ left: '-10px', top: '-10px' }}
      />
      {/* Outer interactive ring */}
      <div
        ref={ringRef}
        className={`custom-cursor pointer-events-none fixed z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-300 ${
          clicked
            ? 'h-[24px] w-[24px] border-brand-purple bg-brand-purple/15'
            : hovered
            ? 'h-[50px] w-[50px] border-brand-indigo bg-brand-indigo/10'
            : 'h-[32px] w-[32px] border-brand-cyan bg-transparent'
        }`}
        style={{ left: '-20px', top: '-20px' }}
      />
    </>
  );
};
