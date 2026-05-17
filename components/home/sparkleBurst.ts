const SPARKLES = ['✦', '★', '·', '♦', '✧'] as const;
const COLORS = ['#45B1C7', '#2D8FA4', '#7DD3E8', '#D93025', '#1C4A52'] as const;

/** クリック位置から小さなキラキラを飛ばす（軽量・モーション配慮あり） */
export function sparkleBurst(clientX: number, clientY: number) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (let i = 0; i < 12; i++) {
    const el = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
    const dist = 28 + Math.random() * 36;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    el.textContent = SPARKLES[i % SPARKLES.length];
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = [
      'position:fixed',
      `left:${clientX}px`,
      `top:${clientY}px`,
      'pointer-events:none',
      'z-index:99999',
      'font-size:14px',
      'line-height:1',
      `color:${COLORS[i % COLORS.length]}`,
      'transition:transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease',
      'transform:translate(-50%,-50%)',
      'opacity:1',
    ].join(';');

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${Math.random() * 40 - 20}deg)`;
      el.style.opacity = '0';
    });

    window.setTimeout(() => el.remove(), 600);
  }
}
