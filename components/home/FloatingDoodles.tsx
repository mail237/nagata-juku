const DOODLES = [
  { emoji: '📐', className: 'top-[12%] left-[6%] text-2xl md:text-3xl', delay: '0s' },
  { emoji: '✏️', className: 'top-[22%] right-[8%] text-xl md:text-2xl', delay: '0.8s' },
  { emoji: '★', className: 'bottom-[38%] left-[10%] text-lg md:text-xl text-[#45B1C7]', delay: '1.4s' },
  { emoji: '🎯', className: 'bottom-[48%] right-[12%] text-xl md:text-2xl', delay: '0.4s' },
  { emoji: '💪', className: 'top-[38%] right-[18%] text-lg md:text-xl hidden sm:block', delay: '1.1s' },
] as const;

/** ヒーロー上のふわふわアイコン（装飾のみ） */
export default function FloatingDoodles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden motion-reduce:hidden"
    >
      {DOODLES.map((d) => (
        <span
          key={d.emoji + d.className}
          className={`absolute select-none opacity-[0.55] animate-float drop-shadow-sm ${d.className}`}
          style={{ animationDelay: d.delay }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}
