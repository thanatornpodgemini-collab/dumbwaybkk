import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // DWTD-inspired palette: bright, saturated, friendly
        dwtd: {
          pink: '#ff5a8a',
          coral: '#ff7a5a',
          yellow: '#ffd23f',
          mint: '#7ad7c1',
          teal: '#3aa6a0',
          blue: '#3a8dde',
          purple: '#7a5af8',
          red: '#e94545',
          orange: '#ff9a3c',
          green: '#5bc46b',
          dark: '#1f2330',
          mid: '#3a3f55',
          cream: '#fff6e8',
        },
      },
      fontFamily: {
        display: ['"Fredoka"', '"Baloo 2"', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
        thai: ['"Noto Sans Thai"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pop: '0 6px 0 rgba(0,0,0,0.18)',
        popsm: '0 3px 0 rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
