'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

/** iOS / 一部ブラウザで window.scrollY だけだと 0 のままになることがある */
function getScrollY(): number {
  if (typeof window === 'undefined') return 0;
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(getScrollY() > 30);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col items-center leading-none">
              <span className="text-xl font-serif font-bold tracking-wider text-[#1C4A52] transition-colors duration-300">
                永田塾
              </span>
              <span className="text-[10px] text-[#777777] tracking-[0.2em] font-sans mt-0.5">
                NAGATA JUKU
              </span>
            </div>
          </Link>

          {/* デスクトップ ナビ */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 group ${
                    active ? 'text-[#45B1C7]' : 'text-[#393939] hover:text-[#45B1C7]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#45B1C7] transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* デスクトップ CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#45B1C7] text-white text-sm font-bold rounded-full transition-all duration-300 ease-out hover:bg-[#0B6678] hover:shadow-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
          >
            無料体験を申し込む
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* モバイル ハンバーガー */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-[#1C4A52] origin-center transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#1C4A52] transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#1C4A52] origin-center transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* モバイル メニュー */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#E0F2F4]">
                <div className="flex flex-col items-center leading-none">
                  <span className="font-serif font-bold text-lg text-[#1C4A52]">永田塾</span>
                  <span className="text-[9px] text-[#777777] tracking-[0.2em] font-sans mt-0.5">
                    NAGATA JUKU
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-[#393939]"
                  aria-label="閉じる"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col flex-1 p-6 gap-1">
                {NAV_LINKS.map((link) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center py-3.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'text-[#45B1C7] bg-blue-50'
                          : 'text-[#1C4A52] hover:text-[#45B1C7] hover:bg-[#F1F5F4]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-[#E0F2F4] flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#45B1C7] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0B6678] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  無料体験を申し込む
                </Link>
                <a
                  href="tel:072-940-7683"
                  className="flex items-center justify-center gap-2 rounded-full border border-[#C7E5EB] px-6 py-3 text-sm font-medium text-[#1C4A52] transition-colors hover:bg-[#E0F2F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  072-940-7683
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
