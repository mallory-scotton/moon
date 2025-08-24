/** Dependencies */
import { TypedEventEmitter } from '@moon/types';
import { ScannerOptions } from './types';
import { minutes } from '@moon/utils';
import { LibrarySection } from '@moon/database';

/**
 * @brief Default scanner options.
 * @description These options are used to configure the behavior of the scanner.
 */
const DEFAULT_SCANNER_OPTIONS: Required<ScannerOptions> = {
  maxConcurrency: 4,
  excludeFileTypes: [],
  includeFileTypes: ['mkv', 'mp4', 'avi', 'mov', 'flv', 'webm'],
  analysisTimeout: minutes(1),
  verboseLogging: false
};

/**
 * @brief Scanner events.
 * @description These events are emitted by the scanner during its operation.
 */
interface ScannerEvents {
  /**
   * @brief Emitted when the analysis progress changes.
   * @description This event is emitted periodically during the analysis process to indicate the current progress.
   * @param percentage - The current progress percentage (0-100).
   * @param filePath - The path of the file being analyzed.
   */
  progress: (percentage: number, filePath: string) => void;

  /**
   * @brief Emitted when the analysis starts.
   * @param librarySectionID - The ID of the library section being analyzed.
   * @returns void
   */
  started: (librarySectionID: string) => void;

  /**
   * @brief Emitted when the analysis completes.
   * @param librarySectionID - The ID of the library section being analyzed.
   * @returns void
   */
  completed: (librarySectionID: string) => void;

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
export class Scanner extends TypedEventEmitter<ScannerEvents> {
  /** Class members */
  private readonly _options: Required<ScannerOptions>;
  public readonly librarySectionID: number;

  /**
   * @brief
   * @description
   * @param librarySectionID - The ID of the library section to scan.
   * @param options -
   */
  constructor(librarySectionID: number, options?: ScannerOptions) {
    // Call the parent constructor
    super();

    // Initialize the scanner options
    this._options = { ...DEFAULT_SCANNER_OPTIONS, ...options };
    this.librarySectionID = librarySectionID;
  }

  public async start(): Promise<void> {}
  public async stop(): Promise<void> {}
  public async pause(): Promise<void> {}
  public async resume(): Promise<void> {}
}
