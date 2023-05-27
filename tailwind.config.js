const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        ss: '500px',
        xl: '1296px'
      },
      colors: {
        primary: {
          50: '#EAFEFE',
          100: '#C6FCFC',
          200: '#9AF7F7',
          300: '#64F2F2',
          400: '#2AE4E4',
          500: '#00BDBD',
          600: '#08A4A9',
          700: '#11868B',
          800: '#167075',
          900: '#155C61',
          950: '#074045',
          DEFAULT: '#00BDBD'
        },
        'secondary-emphasis': {
          50: '#E7FBF6',
          100: '#C2F9ED',
          200: '#95F2E2',
          300: '#57D9C9',
          400: '#1FB9A9',
          500: '#008E86',
          600: '#057070',
          700: '#0B585B',
          800: '#0E4649',
          900: '#0D3A3D',
          950: '#053134',
          DEFAULT: '#008E86'
        },
        gray: {
          100: '#F9F9F9',
          200: '#E9E9E9',
          300: '#D3D3D3',
          400: '#ACACAC',
          500: '#939393',
          600: '#4F4F4F',
          900: '#1A1A1A',
          DEFAULT: '#4F4F4F'
        },
        success: {
          500: '#00C2FF',
          DEFAULT: '#00C2FF'
        },
        secondary: '#EAF8F8',
        'secondary-light': '#EFF5F5',
        light: '#4F4F4F',
        white: '#FFFFFF',
        red: '#F15761'
      },
      fontFamily: {
        sans: [
          'var(--font-ubuntu)',
          'var(--font-noto_sans_tc)',
          ...fontFamily.sans
        ],
        alkatra: ['var(--font-alkatra)']
      },
      keyframes: {
        circle: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        circle: 'circle 1s linear infinite'
      }
    }
  },
  plugins: []
};
