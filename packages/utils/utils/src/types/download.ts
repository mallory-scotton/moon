/**
 * @brief Download options interface
 * @description Options for configuring the download behavior.
 */
export interface DownloadOptions {
  /**
   * @brief Headers to include in the download request
   * @description Additional headers to include in the download request.
   */
  headers?: Record<string, string>;

  /**
   * @brief Timeout for the download request
   * @description The maximum time to wait for the download to complete, in milliseconds.
   */
  timeout?: number;

  /**
   * @brief Number of retries for the download request
   * @description The number of times to retry the download if it fails.
   */
  retries?: number;

  /**
   * @brief Use a temporary directory for the download
   * @description If true, a temporary directory will be used for the download.
   */
  useTemporaryDirectory?: boolean;

  /**
   * @brief Path to the temporary directory
   * @description The path to the temporary directory to use for the download.
   */
  temporaryDirectoryPath?: string;

  /**
   * @brief Extract the downloaded archive
   * @description If true, the downloaded archive will be extracted.
   */
  autoExtract?: boolean;

  /**
   * @brief Emit progress events
   * @description If true, progress events will be emitted during the download.
   */
  emitProgress?: boolean;

  /**
   * @brief Remove the archive after extraction
   * @description If true, the downloaded archive will be removed after extraction.
   */
  removeArchive?: boolean;
}

/**
 * @brief Information about a downloaded file
 * @description This interface contains metadata about a file that has been downloaded.
 */
export interface DownloadInformation {
  /**
   * @brief Version of the downloaded file
   * @description The version number of the file that has been downloaded.
   */
  version: string;

  /**
   * @brief Name of the downloaded file
   * @description The name of the file that has been downloaded.
   */
  name: string;

  /**
   * @brief Type of the downloaded file
   * @description The type of the file that has been downloaded.
   */
  type: 'binary' | 'archive' | 'other';

  /**
   * @brief Path to the downloaded file
   * @description The local file system path where the downloaded file is stored.
   */
  destination: string;

  /**
   * @brief Name of the downloaded file
   * @description The name of the file that has been downloaded.
   */
  filename: string;
}
