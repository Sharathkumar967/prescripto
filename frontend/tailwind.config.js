/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo 600
          light: '#818CF8', // Indigo 400
          dark: '#3730A3', // Indigo 800
          50: '#EEF2FF',
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald 500
          light: '#34D399',
          dark: '#059669',
        },
        dark: {
          bg: '#0F172A', // Slate 900
          card: '#1E293B', // Slate 800
          border: '#334155', // Slate 700
          text: '#F8FAFC', // Slate 50
        }
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
