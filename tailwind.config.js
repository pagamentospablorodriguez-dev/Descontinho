/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#e8f3e4',
          100: '#d3e6cc',
          200: '#b9d7ad',
          300: '#94bd82',
          400: '#5e9a52',
          500: '#2a7d3d',
          600: '#16864c',
          700: '#075b3b',
          800: '#064b31',
          900: '#063e2d',
        },
        gold: {
          50: '#fffbe8',
          100: '#fff0a8',
          200: '#ffe36a',
          300: '#ffda21',
          400: '#f6c900',
          500: '#e0b000',
          600: '#b88700',
        },
        ember: {
          50: '#fff0d8',
          100: '#ffdcab',
          200: '#ffb56b',
          300: '#ef7d00',
          400: '#d46500',
          500: '#a84f00',
        },
        cream: {
          50: '#fffdf7',
          100: '#f5fae7',
          200: '#f0f4e9',
          300: '#e5e9dc',
        },
        sage: {
          400: '#6d786f',
          500: '#5d685f',
          600: '#4a544b',
        },
      },
      boxShadow: {
        card: '0 8px 24px rgba(7,91,59,0.05)',
        'card-hover': '0 18px 40px rgba(7,91,59,0.13)',
        brand: '0 10px 24px rgba(246,201,0,0.22)',
      },
      borderRadius: {
        '4xl': '1.75rem',
        '3xl': '1.35rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
