/** Dependencies */
import { TypedEventEmitter } from '@moon/types';
import { AnalyzerOptions } from './types';

/**
 * @brief
 * @description
 */
interface AnalyzerEvents {
  /**
   * @brief Emitted when the analysis progress changes.
   * @description This event is emitted periodically during the analysis process to indicate the current progress.
   * @param percentage - The current progress percentage (0-100).
   */
  progress: (percentage: number) => void;

  /**
   * @brief Emitted when an error occurs during the analysis.
   * @description This event is emitted when an error is encountered during the analysis process.
   * @param error - The error that occurred.
   */
  error: (error: unknown) => void;
}

/**
 * @brief
 * @description
 * @example
 */
export class Analyzer extends TypedEventEmitter<AnalyzerEvents> {
  /** Class members */

  /**
   * @brief
   * @description
   * @param options -
   */
  constructor(options?: AnalyzerOptions) {
    // Call the parent constructor
    super();
  }
}
