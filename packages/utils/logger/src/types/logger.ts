/**
 * @brief Logger level
 * @description The level of logging to be used.
 * @example
 * const logger = new Logger({
 *   level: 'info'
 * });
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';

/**
 * @brief Logger transport
 * @description The transport mechanism for logging.
 * @example
 * const logger = new Logger({
 *   transport: 'console'
 * });
 */
export type LogTransport = 'console' | 'file';

/**
 * @brief Logger format
 * @description The format in which logs should be output.
 * @example
 * const logger = new Logger({
 *   format: 'json'
 * });
 */
export type LogFormat = 'json' | 'text';
