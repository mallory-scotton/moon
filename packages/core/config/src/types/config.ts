/**
 * @brief Moon logging configuration
 * @description This is the configuration object for the Moon logging.
 */
interface MoonLoggingConfig {
  /**
   * @brief Moon logging transport
   * @description This defines the transport method for logging.
   * @default 'file'
   */
  transport: 'console' | 'file';

  /**
   * @brief Moon logging level
   * @description This defines the logging level for the application.
   * @default 'warn'
   */
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';

  /**
   * @brief Moon logging location
   * @description This defines the location where logs are stored.
   * @default '%APPDATA%/moon/logs'
   */
  location: string;

  /**
   * @brief Moon logging colors
   * @description This defines whether to use colors in the logs.
   * @default true
   */
  colors: boolean;

  /**
   * @brief Moon logging format
   * @description This defines the format of the logs.
   * @default 'text'
   */
  format: 'json' | 'text';
}

/**
 * @brief Moon server configuration
 * @description This is the configuration object for the Moon server.
 */
interface MoonServerConfig {
  /**
   * @brief Moon server port
   * @description This defines the port on which the Moon server listens.
   * @default 45001
   */
  port: number;

  /**
   * @brief Moon server host
   * @description This defines the host on which the Moon server listens.
   * @default '0.0.0.0'
   */
  host: string;

  /**
   * @brief Moon server CORS
   * @description This defines whether to enable CORS for the Moon server.
   * @default true
   */
  cors: boolean;
}

/**
 * @brief Moon vault configuration
 * @description This is the configuration object for the Moon vault.
 */
interface MoonVaultConfig {
  /**
   * @brief Moon vault encryption key
   * @description This defines the encryption key used for the Moon vault.
   * @default 'MOON_DEFAULT_VAULT_KEY'
   */
  encryptionKey: string;

}

/**
 * @brief Moon configuration
 * @description This is the configuration object for the Moon application.
 */
export interface MoonConfig {
  /**
   * @brief Moon server configuration
   * @description This is the configuration object for the Moon server.
   */
  server: MoonServerConfig;

  /**
   * @brief Moon logging configuration
   * @description This is the configuration object for the Moon logging.
   */
  logging: MoonLoggingConfig;

  /**
   * @brief Moon vault configuration
   * @description This is the configuration object for the Moon vault.
   */
  vault: MoonVaultConfig;

  /**
   * @brief Moon application configuration
   * @description This is the configuration object for the Moon application.
   */
  save: () => void;
}
