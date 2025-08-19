/** Dependencies */
// @ts-ignore
import plugin from 'tailwindcss/plugin.js';
import { MoonTWPluginOptions } from './types';
import { variants } from './variants';
import { animations, keyframes } from './animations';

/**
 * @brief Represents the Moon Tailwind CSS plugin.
 * @description This plugin adds custom variants and utilities to Tailwind CSS.
 */
export const MoonTWPlugin = (options?: MoonTWPluginOptions): ReturnType<typeof plugin> => {
  return plugin(
    ({ addVariant }) => {
      // Register custom variants
      Object.keys(variants).forEach((variant) => {
        addVariant(variant, variants[variant]);
      });
    },
    {
      theme: {
        extend: {
          keyframes: keyframes,
          animations: animations
        }
      }
    }
  );
};
