import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        elevated: '#161616',
        border: '#262626',
        accent: {
          DEFAULT: '#C9A961',
          soft: '#E5D4A1',
          deep: '#8B7340',
        },
        ink: {
          DEFAULT: '#F5F5F5',
          muted: '#A3A3A3',
          dim: '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
      },
    },
  },
  plugins: [],
};

export default config;