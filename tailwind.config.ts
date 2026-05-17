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
        'primary-dark': '#2D8FA4',
        dark: '#1C4A52',
        bg: '#FFFFFF',
        surface: '#F2F9FA',
        'surface-alt': '#EBF6F8',
        'gray-custom': {
          100: '#F2F9FA',
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
        'marquee-slow': 'marquee 42s linear infinite',
        float: 'float 4.5s ease-in-out infinite',
        wiggle: 'wiggle 0.45s ease-in-out infinite',
        'pop-in': 'pop-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        /** translate3d で GPU 合成（iOS Safari でマーキーが止まりにくい） */
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -10px, 0) rotate(6deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
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
