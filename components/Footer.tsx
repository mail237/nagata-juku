import Link from 'next/link';
import { SCHOOL, NAV_LINKS, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1C4A52] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-8">
          {/* ロゴ・塾情報 */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex flex-col items-center mb-4">
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                永田塾
              </span>
              <span className="text-xs text-gray-400 tracking-[0.2em] font-sans mt-1">
                NAGATA JUKU
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {SCHOOL.tagline}
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-[#45B1C7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{SCHOOL.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#45B1C7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href={`tel:${SCHOOL.phone}`}
                  className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
                >
                  {SCHOOL.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#45B1C7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{SCHOOL.hours}（定休：{SCHOOL.closed}）</span>
              </div>
              {SCHOOL.instagramUrl ? (
                <div className="flex items-center gap-2 pt-1">
                  <svg className="w-4 h-4 text-[#45B1C7] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <a
                    href={SCHOOL.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm text-gray-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
                  >
                    Instagram（公式）
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* メインナビ */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-5">
              Menu
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-gray-600 group-hover:bg-[#45B1C7] group-hover:w-6 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サブナビ */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-5">
              Info
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-gray-600 group-hover:bg-[#45B1C7] group-hover:w-6 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#45B1C7] px-5 py-2.5 text-sm font-bold text-[#45B1C7] transition-all duration-300 ease-out hover:bg-[#45B1C7] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
              >
                無料体験を申し込む
              </Link>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed max-w-3xl mt-10 border-t border-white/10 pt-8">
          {SCHOOL.imageDisclaimer}
        </p>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} 永田塾 All Rights Reserved.
          </p>
          <p className="text-xs text-gray-500">
            {SCHOOL.access}
          </p>
        </div>
      </div>
    </footer>
  );
}
