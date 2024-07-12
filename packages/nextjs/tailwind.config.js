/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        main: {
          primary: '#C3EFFD',
          'primary-focus': '#AEE5F5',
          'primary-content': '#07282F',
          secondary: '#EB87DB',
          'semantic-accent-content': '#07282F',
          'secondary-focus': '#EE73DB',
          accent: '#FCFE90',
          'accent-focus': '#FDFF7D',
          neutral: '#374151',
          'neutral-focus': '#1F2937',
          'neutral-content': '#FFFFFF',
          'base-100': '#F3F4F6',
          'base-200': '#E5E7EB',
          'base-300': '#D1D5DB',
          'base-content': '#000000',
        },
      },
    ],
  },
}
