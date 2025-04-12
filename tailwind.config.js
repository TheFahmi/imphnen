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
        'comic': ['var(--font-comic)', 'Comic Sans MS', 'Comic Sans', 'cursive'],
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
      },
    },
  },
  plugins: [],
};
