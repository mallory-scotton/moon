/** Dependencies */
import { MoonConfig } from './types';
import path from 'path';
import fs from 'fs';

/**
 * @brief Local application data directory
 * @description This directory is used to store application data specific to the user.
 */
export const LOCALAPPDATA =
  process.env.LOCALAPPDATA ||
  (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share');

/**
 * @brief Moon application data directory
 * @description This directory is used to store application data specific to the Moon application.
 */
export const MOON_APPDATA = path.join(LOCALAPPDATA, 'moon');

/**
 * @brief Moon configuration file path
 * @description This is the path to the Moon configuration file.
 */
export const MOON_CONFIG_PATH = path.join(MOON_APPDATA, 'config', 'config.json');

/**
 * @brief Moon database file path
 * @description This is the path to the Moon database file, which stores application data.
 */
export const MOON_DATABASE_PATH = path.join(MOON_APPDATA, 'data', 'database.db');

/**
 * @brief Moon logs directory path
 * @description This is the path to the Moon logs directory, which stores application logs.
 */
export const MOON_LOGS_PATH = path.join(MOON_APPDATA, 'logs');

/**
 * @brief Default Moon configuration
 * @description This is the default configuration for the Moon application.
 */
export const DEFAULT_MOON_CONFIG: Required<MoonConfig> = {
  server: {
    port: 45001,
    host: '0.0.0.0',
    cors: true
  },
  logging: {
    level: 'info',
    location: MOON_LOGS_PATH,
    transport: 'file',
    colors: true,
    format: 'text'
  },
  save: () => {
    // Create the config directory if it doesn't exist
    if (!fs.existsSync(path.dirname(MOON_CONFIG_PATH))) {
      fs.mkdirSync(path.dirname(MOON_CONFIG_PATH), { recursive: true });
    }
    // Save the config
    const { save, ...plain } = this as any;
    // Remove the save method from the plain object
    fs.writeFileSync(MOON_CONFIG_PATH, JSON.stringify(plain, null, 2), 'utf-8');
  }
};

/**
 * @brief Moon application directory tree
 * @description This is the directory tree structure for the Moon application.
 */
export const MOON_APPLICATION_TREE = {
  // Moon application directory structure
  moon: {
    // Cache directory
    cache: {},
    // Binaries directory
    binaries: {},
    // Configuration directory
    config: {
      'config.json': JSON.stringify(DEFAULT_MOON_CONFIG, null, 2)
    },
    // Logs directory
    logs: {},
    // Data directory
    data: {
      // Database file
      'database.db': '',
      // Media directory
      'media': {},
      // Backups directory
      'backups': {}
    },
    // Temporary files directory
    temp: {},
    // Plugins directory
    plugins: {},
    // Themes directory
    themes: {},
    // Documentation directory
    docs: {
      'API': {
        V1: {},
        'API.MD': ''
      },
      'GUIDES': {},
      'PLUGINS': {},
      'THEMES': {},
      'ARCHITECTURE.md': '',
      'README.md': '',
      'CHANGELOG.md': '',
      'LICENSE.md': '',
      'SECURITY.md': '',
      'PRIVACY_POLICY.md': '',
      'COPYRIGHT.md': '',
      'CONFIG.md': '',
      'BACKEND.md': '',
      'DESKTOP.md': '',
      'WEBAPP.md': ''
    }
  }
};
