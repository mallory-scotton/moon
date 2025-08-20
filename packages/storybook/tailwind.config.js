/** Import theme */
import { MoonTwPlugin } from '@moon/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './.storybook/welcome.mkdx',
    '../components/*/src/**/*.{js,jsx,ts,tsx}',
    '../components/*/stories/**/*.{js,jsx,ts,tsx}',
    '../core/theme/src/components/**/*.{js,jsx,ts,tsx}',
    '../core/theme/src/utilities/**/*.{js,jsx,ts,tsx}',
    '../core/theme/stories/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  plugins: [MoonTwPlugin()]
};
