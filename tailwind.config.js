/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['var(--font-press-start)', 'Press Start 2P', 'monospace'],
        'vt323': ['var(--font-vt323)', 'VT323', 'monospace'],
        'silkscreen': ['var(--font-silkscreen)', 'Silkscreen', 'monospace'],
        'retro': ['var(--font-vt323)', 'VT323', 'monospace'],
        'comic': ['var(--font-comic)', 'Comic Neue', 'Comic Sans MS', 'Comic Sans', 'cursive'],
      },
      colors: {
        navy: '#000080',
        silver: '#c0c0c0',
      },
      backgroundColor: {
        'navy': '#000080',
        'silver': '#c0c0c0',
      },
      textColor: {
        'navy': '#000080',
      },
      borderColor: {
        'navy': '#000080',
        'silver': '#c0c0c0',
      },
      animation: {
        'blink': 'blinker 1s linear infinite',
        'rainbow': 'rainbow 5s linear infinite',
        'marquee': 'marquee 15s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'talk': 'talk 0.3s infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'bonzi-bounce': 'bonzi-bounce 2s ease-in-out infinite',
      },
      keyframes: {
        blinker: {
          '50%': { opacity: '0' },
        },
        rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        talk: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.8)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(15deg)' },
        },
        'bonzi-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
