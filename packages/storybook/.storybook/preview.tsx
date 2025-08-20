/** Dependencies */
import { background, themes } from '@storybook/theming';
import type { Preview } from '@storybook/react';
import './style.css';

const commonTheme = {
  brandTitle: 'Moon',
  brandUrl: 'https://github.com/mallory-scotton/moon',
  brandTarget: '_self'
};

const parameters: Preview['parameters'] = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Foundations', 'Components']
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  background: {
    app: '#161616',
    bar: '#161616',
    content: '#161616',
    preview: '#161616',
    hoverable: '#161616',
    positive: '#161616',
    negative: '#161616',
    warning: '#161616',
    critical: '#161616'
  },
  darkMode: {
    current: 'dark',
    stylePreview: true,
    darkClass: 'dark',
    lightClass: 'light',
    classTarget: 'html',
    dark: {
      ...themes.dark,
      ...commonTheme,
      appBg: '#161616',
      barBg: '#161616',
      appContentBg: '#161616',
      appPreviewBg: '#161616',
      inputBg: '#161616',
      buttonBg: '#161616',
      booleanBg: '#161616',
      booleanSelectedBg: '#161616',
      appBorderRadius: 14,
      brandImage: '/dark-logo.svg'
    },
    light: {
      ...themes.light,
      ...commonTheme,
      appBorderRadius: 14,
      brandImage: '/light-logo.svg'
    }
  },
  backgrounds: {
    values: [
      { name: 'Dark', value: '#131314' },
      { name: 'Light', value: '#FFFFFF' }
    ],
    default: 'Dark'
  }
};

const preview: Preview = {
  parameters,
  tags: ['autodocs']
};

export default preview;
