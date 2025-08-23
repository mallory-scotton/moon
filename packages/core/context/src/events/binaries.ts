/**
 * @brief Binaries event map.
 * @description This interface defines the event map for binary downloads.
 */
export interface BinariesEventMap {
  /**
   * @brief Emitted when a binary download starts.
   * @description This event is emitted when a binary download starts.
   * @property {string} version - The version of the binary being downloaded.
   * @property {string} name - The name of the binary being downloaded.
   */
  'download:start': { version: string; name: string };

  /**
   * @brief Emitted when a binary download is in progress.
   * @description This event is emitted when a binary download is in progress.
   * @property {string} version - The version of the binary being downloaded.
   * @property {string} name - The name of the binary being downloaded.
   * @property {number} progress - The download progress percentage.
   * @property {number} downloadedBytes - The number of bytes downloaded.
   * @property {number} totalBytes - The total number of bytes to download.
   */
  'download:progress': {
    version: string;
    name: string;
    progress: number;
    downloadedBytes: number;
    totalBytes: number;
  };

  /**
   * @brief Emitted when a binary download ends.
   * @description This event is emitted when a binary download ends.
   * @property {string} version - The version of the binary being downloaded.
   * @property {string} name - The name of the binary being downloaded.
   * @property {number} downloadedBytes - The number of bytes downloaded.
   * @property {string} path - The path to the downloaded file.
   */
  'download:complete': {
    version: string;
    name: string;
    downloadedBytes: number;
    path: string;
  };

  /**
   * @brief Emitted when a binary download fails.
   * @description This event is emitted when a binary download fails.
   * @property {string} version - The version of the binary being downloaded.
   * @property {string} name - The name of the binary being downloaded.
   * @property {Error} error - The error that caused the download to fail.
   * @property {string} context - Additional context about the error.
   */
  'download:error': {
    version: string;
    name: string;
    error: Error;
    context?: string;
  };

  /**
   * @brief Emitted when a binary download times out.
   * @description This event is emitted when a binary download times out.
   * @property {string} version - The version of the binary being downloaded.
   * @property {string} name - The name of the binary being downloaded.
   */
  'download:timeout': { version: string; name: string };

  /**
   * @brief Emitted when a binary download is retried.
   * @description This event is emitted when a binary download is retried.
   * @property {string} version - The version of the binary being downloaded.
   * @property {string} name - The name of the binary being downloaded.
   * @property {number} attempt - The retry attempt number.
   */
  'download:retry': { version: string; name: string; attempt: number };

  /**
   * @brief Emitted when a binary extraction starts.
   * @description This event is emitted when a binary extraction starts.
   * @property {string} version - The version of the binary being extracted.
   * @property {string} name - The name of the binary being extracted.
   * @property {string} archive - The path to the archive being extracted.
   * @property {string} destination - The destination directory for extraction.
   */
  'extract:start': {
    version: string;
    name: string;
    archive: string;
    destination: string;
  };

  /**
   * @brief Emitted when a binary extraction ends.
   * @description This event is emitted when a binary extraction ends.
   * @property {string} version - The version of the binary being extracted.
   * @property {string} name - The name of the binary being extracted.
   * @property {string} destination - The destination directory where files were extracted.
   */
  'extract:complete': {
    version: string;
    name: string;
    destination: string;
  };

  /**
   * @brief Emitted when a binary extraction fails.
   * @description This event is emitted when a binary extraction fails.
   * @property {string} version - The version of the binary being extracted.
   * @property {string} name - The name of the binary being extracted.
   * @property {Error} error - The error that caused the extraction to fail.
   * @property {string} context - Additional context about the error.
   * @property {string} archive - The path to the archive that failed to extract.
   * @property {string} destination - The destination directory for extraction.
   * @property {string} command - The command that was executed (optional).
   */
  'extract:error': {
    version: string;
    name: string;
    error: Error;
    context?: string;
    archive: string;
    destination: string;
    command?: string;
  };

  /**
   * @brief Emitted when a binary installation completes successfully.
   * @description This event is emitted when the entire binary installation process completes.
   * @property {string} version - The version of the binary that was installed.
   * @property {string} name - The name of the binary that was installed.
   * @property {string} path - The path where the binary was installed.
   */
  'install:complete': {
    version: string;
    name: string;
    path: string;
  };

  /**
   * @brief Emitted when a general binary error occurs.
   * @description This event is emitted for any general binary-related error.
   * @property {Error} error - The error that occurred.
   * @property {string} context - Additional context about the error.
   * @property {string} operation - The operation that was being performed.
   * @property {string} name - The name of the binary.
   * @property {string} version - The version of the binary.
   */
  'error': {
    error: Error;
    context?: string;
    operation: string;
    name: string;
    version: string;
  };
}
