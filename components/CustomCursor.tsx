'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // モバイルデバイスでは表示しない
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // ドット: 即時追従
    // リング: 遅延追従（慣性）
    const LERP = 0.12;

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 6}px, ${mousePos.current.y - 6}px)`;
      }

      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* cursor-dot: 直径12px 即時追従 */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#45B1C7',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          opacity: isVisible && !isHovering ? 1 : 0,
          transform: isClicking ? 'scale(1.5)' : 'scale(1)',
          transition: 'opacity 0.2s ease, transform 0.15s ease',
        }}
      />

      {/* cursor-ring: 直径36px 遅延追従 */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid #45B1C7',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          opacity: isVisible ? (isHovering ? 0.4 : 1) : 0,
          transform: isHovering
            ? 'translate(-18px, -18px) scale(2.5)'
            : 'scale(1)',
          transition: 'opacity 0.2s ease, transform 0.3s ease',
        }}
      />
    </>
  );
}
