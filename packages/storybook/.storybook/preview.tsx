/** Dependencies */
import React from 'react';
import { themes } from '@storybook/theming';
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
  darkMode: {
    current: 'dark',
    stylePreview: true,
    darkClass: 'dark',
    lightClass: 'light',
    classTarget: 'html',
    dark: {
      ...themes.dark,
      ...commonTheme,
      appBorderRadius: 14,
      brandImage: '/dark-logo.svg'
    },
    light: {
      ...themes.light,
      ...commonTheme,
      appBorderRadius: 14,
      brandImage: '/light-logo.svg'
    }
  }
};

const preview: Preview = {
  parameters,
  tags: ['autodocs']
};

export default preview;
