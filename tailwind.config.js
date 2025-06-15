/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Professional blue (blue-600)
        'primary-50': '#EFF6FF', // Light blue tint (blue-50)
        'primary-100': '#DBEAFE', // Lighter blue (blue-100)
        'primary-500': '#3B82F6', // Medium blue (blue-500)
        'primary-700': '#1D4ED8', // Darker blue (blue-700)
        'primary-900': '#1E3A8A', // Deep blue (blue-900)

        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate (slate-500)
        'secondary-100': '#F1F5F9', // Light slate (slate-100)
        'secondary-200': '#E2E8F0', // Lighter slate (slate-200)
        'secondary-300': '#CBD5E1', // Light-medium slate (slate-300)
        'secondary-600': '#475569', // Medium-dark slate (slate-600)
        'secondary-700': '#334155', // Dark slate (slate-700)

        // Accent Colors
        'accent': '#0EA5E9', // Energetic sky blue (sky-500)
        'accent-100': '#E0F2FE', // Light sky blue (sky-100)
        'accent-200': '#BAE6FD', // Lighter sky blue (sky-200)
        'accent-600': '#0284C7', // Darker sky blue (sky-600)

        // Background Colors
        'background': '#FAFBFC', // Subtle off-white (custom)
        'surface': '#FFFFFF', // Pure white (white)

        // Text Colors
        'text-primary': '#1E293B', // Deep slate (slate-800)
        'text-secondary': '#64748B', // Muted slate (slate-500)

        // Status Colors
        'success': '#059669', // Professional emerald (emerald-600)
        'success-50': '#ECFDF5', // Light emerald (emerald-50)
        'success-100': '#D1FAE5', // Lighter emerald (emerald-100)
        'success-500': '#10B981', // Medium emerald (emerald-500)

        'warning': '#D97706', // Balanced amber (amber-600)
        'warning-50': '#FFFBEB', // Light amber (amber-50)
        'warning-100': '#FEF3C7', // Lighter amber (amber-100)
        'warning-500': '#F59E0B', // Medium amber (amber-500)

        'error': '#DC2626', // Clear red (red-600)
        'error-50': '#FEF2F2', // Light red (red-50)
        'error-100': '#FEE2E2', // Lighter red (red-100)
        'error-500': '#EF4444', // Medium red (red-500)

        // Border Colors
        'border': '#E2E8F0', // Neutral border (slate-200)
        'border-focus': '#2563EB', // Focus border (blue-600)
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'dropdown': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spring': 'spring 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        spring: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '1000': '1000',
        '1010': '1010',
        '1050': '1050',
        '1100': '1100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}