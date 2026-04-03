'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  end,
  suffix = '',
  duration = 2,
  className = '',
}: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = () => {
      frame++;
      const progress = easeOut(frame / totalFrames);
      setCount(Math.round(progress * end));

      if (frame < totalFrames) {
        requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
