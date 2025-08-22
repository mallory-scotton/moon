/**
 * @brief
 * @description
 */
export interface ScannerEventMap {
  /**
   * @brief Emitted when the scanning process is started.
   * @description This event is emitted when the scanning process begins.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {boolean} update - Whether to update the library section.
   */
  'started': { librarySectionID: number; update: boolean };

  /**
   * @brief Emitted when the scanning process is stopped.
   * @description This event is emitted when the scanning process is stopped.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {number} discoveredFileCount - The number of files discovered.
   */
  'stopped': { librarySectionID: number; discoveredFileCount: number };

  /**
   * @brief Emitted when the scanning process provides information.
   * @description This event is emitted when the scanning process provides information about the files being scanned.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {number} fileCount - The number of files being scanned.
   */
  'info': { librarySectionID: number; fileCount: number };

  /**
   * @brief Emitted when the scanning process encounters an error.
   * @description This event is emitted when the scanning process encounters an error.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {Error} error - The error that occurred.
   * @property {string} [context] - Additional context about the error.
   */
  'error': { librarySectionID: number; error: Error; context?: string };

  /**
   * @brief Emitted when the scanning process discovers a file.
   * @description This event is emitted when a file is discovered during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the discovered file.
   */
  'progress:discovered': { librarySectionID: number; filePath: string };

  /**
   * @brief Emitted when the scanning process is extracting a file.
   * @description This event is emitted when a file is being extracted during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the file being extracted.
   */
  'progress:extracting': { librarySectionID: number; filePath: string };

  /**
   * @brief Emitted when the scanning process has extracted a file.
   * @description This event is emitted when a file has been extracted during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the extracted file.
   * @property {boolean} success - Whether the extraction was successful.
   * @property {number} [size] - The size of the extracted file.
   * @property {number} [container] - The container ID of the extracted file.
   * @property {number} [duration] - The duration of the extraction process.
   */
  'progress:extracted': {
    librarySectionID: number;
    filePath: string;
    success: boolean;
    size?: number;
    container?: number;
    duration?: number;
  };

  /**
   * @brief Emitted when the scanning process is fetching a file.
   * @description This event is emitted when a file is being fetched during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the file being fetched.
   */
  'progress:fetching': { librarySectionID: number; filePath: string };

  /**
   * @brief Emitted when the scanning process has fetched a file.
   * @description This event is emitted when a file has been fetched during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the fetched file.
   * @property {boolean} success - Whether the fetching was successful.
   * @property {string} [title] - The title of the fetched file.
   * @property {number} [year] - The year of the fetched file.
   */
  'progress:fetched': { librarySectionID: number; filePath: string; success: boolean; title?: string; year?: number };

  /**
   * @brief Emitted when the scanning process is downloading a file.
   * @description This event is emitted when a file is being downloaded during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the file being downloaded.
   */
  'progress:downloading': { librarySectionID: number; filePath: string };

  /**
   * @brief Emitted when the scanning process has downloaded a file.
   * @description This event is emitted when a file has been downloaded during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the downloaded file.
   * @property {boolean} success - Whether the downloading was successful.
   */
  'progress:downloaded': { librarySectionID: number; filePath: string; success: boolean };

  /**
   * @brief Emitted when the scanning process is updating a file.
   * @description This event is emitted when a file is being updated during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the file being updated.
   */
  'progress:updating': { librarySectionID: number; filePath: string };

  /**
   * @brief Emitted when the scanning process has updated a file.
   * @description This event is emitted when a file has been updated during the scanning process.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the updated file.
   */
  'progress:updated': { librarySectionID: number; filePath: string };

  /**
   * @brief Emitted when the scanning process is completed.
   * @description This event is emitted when the scanning process has completed.
   * @property {number} librarySectionID - The ID of the library section.
   * @property {string} filePath - The path of the completed file.
   */
  'progress:completed': { librarySectionID: number; filePath: string };
}
