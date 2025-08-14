/** Dependencies */
import dotenv from 'dotenv';
import fs from 'fs';
import { createDirectoryTree } from './directory';
import { MoonConfig } from './types';

/** Load environment variables from .env file */
dotenv.config({ quiet: true });

/** Load constants */
import { DEFAULT_MOON_CONFIG, LOCALAPPDATA, MOON_APPLICATION_TREE, MOON_CONFIG_PATH } from './constants';

/**
 * @brief Deep merge two objects
 * @description Merges the properties of the source object into the target object.
 * @param target - The target object to merge properties into.
 * @param source - The source object to merge properties from.
 * @returns The merged object.
 * @example
 * const merged = deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
 * console.log(merged); // { a: 1, b: { c: 2, d: 3 } }
 */
function deepMerge<T>(target: any, source: any): T {
  if (source && typeof source === 'object') {
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') target[key] = {};
        deepMerge(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

/**
 * @brief Setup Moon configuration
 * @description Initializes the Moon configuration by creating necessary directories and loading existing config.
 * @returns The initialized Moon configuration.
 * @example
 * const config = setupConfiguration();
 */
function setupConfiguration(): MoonConfig {
  // Create the application directory structure
  createDirectoryTree(MOON_APPLICATION_TREE, LOCALAPPDATA);

  // Load existing config if it exists
  if (fs.existsSync(MOON_CONFIG_PATH)) {
    try {
      const configData = fs.readFileSync(MOON_CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(configData);
      const merged = deepMerge(structuredClone(DEFAULT_MOON_CONFIG), parsed);
      return merged as MoonConfig;
    } catch (error) {
      fs.rmSync(MOON_CONFIG_PATH, { force: true });
      fs.writeFileSync(MOON_CONFIG_PATH, JSON.stringify(DEFAULT_MOON_CONFIG, null, 2));
    }
  }

  // If no existing config was found, return the default config
  return DEFAULT_MOON_CONFIG;
}

/**
 * @brief Moon application configuration
 * @description This is the configuration object for the Moon application.
 */
export const config: MoonConfig = setupConfiguration();
