import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary_color: '#dc217a',
        secondary_color: '#9449eb',
        gray_color: 'rgb(100,100,100)',
        dark: '#111',
      },
    },
  },
  plugins: [],
}
export default config
