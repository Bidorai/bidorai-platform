/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bidorai-blue': {
          50: '#eff6ff',
          500: '#1877F2',
          600: '#1565C0',
          700: '#1d4ed8',
        },
        'bidorai-neutral': {
          50: '#F9FAFB',
          200: '#E5E7EB',
          600: '#6B7280',
          900: '#1F2937',
        }
      },
    },
  },
  plugins: [],
}