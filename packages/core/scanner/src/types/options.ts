/**
 * @brief
 * @description
 */
export interface ScannerOptions {
  /**
   * @brief The maximum number of concurrent file analyses.
   * @description This option sets the maximum number of files that can be analyzed concurrently.
   * Increasing this number may improve performance on systems with multiple CPU cores, but may also increase memory usage.
   * @default 4
   */
  maxConcurrency?: number;

  /**
   * @brief Enable or disable detailed logging.
   * @description When set to true, the scanner will output detailed logs about its operations.
   * This can be useful for debugging purposes, but may also produce a large amount of log data.
   * @default false
   */
  verboseLogging?: boolean;

  /**
   * @brief The timeout duration for file analysis operations, in milliseconds.
   * @description This option sets the maximum time allowed for analyzing a single file.
   * If the analysis takes longer than this duration, it will be aborted and an error will be emitted.
   * @default 30000 (30 seconds)
   */
  analysisTimeout?: number;

  /**
   * @brief The file types to include in the analysis.
   * @description This option allows you to specify which file types should be included in the analysis.
   * You can use glob patterns to match multiple files.
   */
  includeFileTypes?: string[];

  /**
   * @brief The file types to exclude from the analysis.
   * @description This option allows you to specify which file types should be excluded from the analysis.
   * You can use glob patterns to match multiple files.
   */
  excludeFileTypes?: string[];
}
