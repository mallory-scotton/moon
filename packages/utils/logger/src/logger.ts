/** Dependencies */
import chalk from 'chalk';
import { LogLevel, LoggerOptions, LogFormat, LogTransport } from './types';
import path from 'path';
import fs from 'fs';
import { config } from '@moon/config';

/**
 * @brief Default logger options
 * @description The default options for the logger.
 */
const DEFAULT_LOGGER_OPTIONS: Required<LoggerOptions> = {
  level: (config.logging.level as LogLevel) || (process.env.LOG_LEVEL as LogLevel) || 'info',
  namespace: (process.env.LOG_NAMESPACE as string) || 'moon',
  transport: (config.logging.transport as LogTransport) || (process.env.LOG_TRANSPORT as LogTransport) || 'console',
  format: (config.logging.format as LogFormat) || (process.env.LOG_FORMAT as LogFormat) || 'text',
  timestamp: true,
  colors: true,
  folderLocation: (config.logging.location as string) || (process.env.LOG_FOLDER as string) || 'logs'
};

/**
 * @brief Logger levels
 * @description The available log levels.
 */
const LOG_LEVELS: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal', 'silent'];

/**
 * @brief Logger
 * @description The main logger class.
 */
const MAX_LOG_FILE_SIZE = 5 * 1024 * 1024;

/**
 * @brief Logger
 * @description The main logger class.
 * @example
 * const logger = new Logger({
 *   level: 'info',
 *   transport: 'console',
 *   format: 'json'
 * });
 * 
 * logger.info('This is an info message');
 * logger.error('This is an error message');
 */
export class Logger {
  /** Class members */
  private readonly _options: Required<LoggerOptions>;
  private _currentLogFile?: string;

  /**
   * @brief Logger constructor
   * @description Initializes a new instance of the Logger class.
   * @param options - The options for the logger.
   */
  constructor(options?: LoggerOptions) {
    // Merge default options with user-provided options
    this._options = { ...DEFAULT_LOGGER_OPTIONS, ...options };
  }

  /**
   * @brief Format message
   * @description Formats a log message.
   * @param level - The log level.
   * @param message - The log message.
   * @returns The formatted log message.
   * @example
   * const message = logger.formatMessage('info', 'This is an info message');
   * console.log(message);
   */
  private formatMessage(level: LogLevel, message: string): string {
    // Get the current timestamp
    const timestamp = this._options.timestamp ? new Date().toISOString() : '';
    // Format the message based on the selected format
    const formattedMessage =
      this._options.format === 'json'
        ? JSON.stringify({ level, message, timestamp })
        : `${timestamp} [${this._options.namespace}] [${level.toUpperCase()}] ${message}`;

    // Check if colors are enabled and transport is console
    if (!this._options.colors || this._options.transport !== 'console') {
      return formattedMessage;
    }

    // Apply colors based on log level
    switch (level) {
      case 'debug':
        return chalk.blue(formattedMessage);
      case 'info':
        return chalk.green(formattedMessage);
      case 'warn':
        return chalk.yellow(formattedMessage);
      case 'error':
        return chalk.red(formattedMessage);
      case 'fatal':
        return chalk.magenta(formattedMessage);
      default:
        return formattedMessage;
    }
  }

  /**
   * @brief Verifies if a log message should be logged.
   * @description Checks if the log level is enabled.
   * @param level - The log level to check.
   * @returns True if the log level is enabled, false otherwise.
   * @example
   * const isEnabled = logger.shouldLog('info');
   * console.log(isEnabled);
   */
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(this._options.level);
  }

  /**
   * @brief Initializes the log file.
   * @description Creates a new log file or reuses an existing one.
   * @returns The path to the log file.
   * @example
   * const logFilePath = logger.initLogFile();
   * console.log(logFilePath);
   */
  private initLogFile(): string {
    const resolved = path.resolve(this._options.folderLocation);

    // Create the log folder if it doesn't exist
    if (!fs.existsSync(resolved)) {
      fs.mkdirSync(resolved, { recursive: true });
    }

    // Get the list of log files
    const files = fs
      .readdirSync(resolved)
      .filter((file) => file.endsWith('.log'))
      .map((file) => ({
        name: file,
        time: fs.statSync(path.join(resolved, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    // Reuse the latest log file if it hasn't reached the maximum size
    if (files.length > 0) {
      const latestPath = path.join(resolved, files[0].name);
      // Check if the latest log file is still valid
      // with a size < MAX_LOG_FILE_SIZE
      if (fs.statSync(latestPath).size < MAX_LOG_FILE_SIZE) {
        return latestPath;
      }
    }

    // Create a new log file
    const newFile = `Logs-${new Date().toISOString().replace(/[:.]/g, '-')}.log`;

    // Return the path to the new log file
    return path.join(resolved, newFile);
  }

  /**
   * @brief Gets the log file path.
   * @description Returns the path to the current log file.
   * @returns The path to the log file.
   * @example
   * const logFilePath = logger.getLogFilePath();
   * console.log(logFilePath);
   */
  private getLogFilePath(): string {
    // Check if the current log file is set
    if (!this._currentLogFile) {
      // Initialize the log file
      this._currentLogFile = this.initLogFile();
    } else if (fs.statSync(this._currentLogFile).size >= MAX_LOG_FILE_SIZE) {
      // Create a new log file
      this._currentLogFile = this.initLogFile();
    }
    return this._currentLogFile;
  }

  /**
   * @brief Formats a log message.
   * @description Prepares the log message for output.
   * @param level - The log level.
   * @param message - The log message.
   * @example
   * logger.log('info', 'This is an info message');
   */
  public log(level: LogLevel, message: string): void {
    // Check if the log level is enabled
    if (this.shouldLog(level)) {
      // If the transport method is console log the message in the stdout
      if (this._options.transport === 'console') {
        console.log(this.formatMessage(level, message));
      } else if (this._options.transport === 'file') {
        // otherwise log the message to a file
        fs.appendFileSync(this.getLogFilePath(), this.formatMessage(level, message) + '\n');
      }
    }
  }

  /**
   * @brief Logs a debug message.
   * @description Logs a message with the debug log level.
   * @param message - The log message.
   * @example
   * logger.debug('This is a debug message');
   */
  public debug(message: string): void {
    this.log('debug', message);
  }

  /**
   * @brief Logs an info message.
   * @description Logs a message with the info log level.
   * @param message - The log message.
   * @example
   * logger.info('This is an info message');
   */
  public info(message: string): void {
    this.log('info', message);
  }

  /**
   * @brief Logs a warning message.
   * @description Logs a message with the warn log level.
   * @param message - The log message.
   * @example
   * logger.warn('This is a warning message');
   */
  public warn(message: string): void {
    this.log('warn', message);
  }

  /**
   * @brief Logs an error message.
   * @description Logs a message with the error log level.
   * @param message - The log message.
   * @example
   * logger.error('This is an error message');
   */
  public error(message: string): void {
    this.log('error', message);
  }

  /**
   * @brief Logs a fatal message.
   * @description Logs a message with the fatal log level.
   * @param message - The log message.
   * @example
   * logger.fatal('This is a fatal message');
   */
  public fatal(message: string): void {
    this.log('fatal', message);
  }
}
