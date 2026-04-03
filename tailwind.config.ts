import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#45B1C7',
        'primary-dark': '#0B6678',
        dark: '#1C4A52',
        bg: '#FFFFFF',
        'gray-custom': {
          100: '#F1F5F4',
          200: '#C7E5EB',
          500: '#777777',
          700: '#393939',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-noto-sans)',
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Yu Gothic',
          'YuGothic',
          'Meiryo',
          'sans-serif',
        ],
        serif: [
          'var(--font-noto-serif)',
          'Hiragino Mincho ProN',
          'Yu Mincho',
          'YuMincho',
          'serif',
        ],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        /** translate3d で GPU 合成（iOS Safari でマーキーが止まりにくい） */
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(28, 74, 82, 0.06)',
        'card-hover': '0 14px 40px rgba(28, 74, 82, 0.1)',
        cta: '0 8px 28px rgba(69, 177, 199, 0.28)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
