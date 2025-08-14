/** Dependencies */
import { LogLevel, LogFormat, LogTransport } from './logger';

/**
 * @brief Logger options
 * @description The options for configuring the logger.
 * @example
 * const logger = new Logger({
 *   level: 'info',
 *   transport: 'console',
 *   format: 'json'
 * });
 */
export interface LoggerOptions {
  /**
   * @brief Logger level
   * @description The level of logging to be used.
   */
  level?: LogLevel;

  /**
   * @brief Logger namespace
   * @description The namespace for the logger, used to group logs.
   */
  namespace?: string;

  /**
   * @brief Logger transport
   * @description The transport mechanism for logging.
   */
  transport?: LogTransport;

  /**
   * @brief Logger format
   * @description The format in which logs should be output.
   */
  format?: LogFormat;

  /**
   * @brief Logger timestamp
   * @description Whether to include a timestamp in log messages.
   */
  timestamp?: boolean;

  /**
   * @brief Logger colors
   * @description Whether to use colors in log messages.
   */
  colors?: boolean;

  /**
   * @brief Logger folder location
   * @description The folder location for log files.
   */
  folderLocation?: string;
}
