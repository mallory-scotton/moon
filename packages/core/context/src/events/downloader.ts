/**
 * @brief Download events
 * @description Events related to the download process
 */
export interface DownloaderEventMap {
  /**
   * @brief Download added
   * @description Emitted when a download is added
   * @property {number} metadataItemID The ID of the metadata item being downloaded
   */
  added: { metadataItemID: number };

  /**
   * @brief Download started
   * @description Emitted when a download starts
   * @property {number} metadataItemID The ID of the metadata item being downloaded
   * @property {number} size The size of the metadata item being downloaded
   */
  started: { metadataItemID: number; size: number };

  /**
   * @brief Download completed
   * @description Emitted when a download completes
   * @property {number} metadataItemID The ID of the metadata item that was downloaded
   * @property {boolean} success Whether the download was successful
   * @property {number} duration The duration of the download in milliseconds
   * @property {number} mediaItemID The ID of the media item associated with the download, if any
   */
  completed: { metadataItemID: number; success: boolean; duration: number; mediaItemID?: number };

  /**
   * @brief Download paused
   * @description Emitted when a download is paused
   * @property {number} metadataItemID The ID of the metadata item being downloaded
   * @property {string} [context] The context in which the download was paused
   */
  paused: { metadataItemID: number; context?: string };

  /**
   * @brief Download resuming
   * @description Emitted when a download is resuming
   * @property {number} metadataItemID The ID of the metadata item being downloaded
   * @property {string} [context] The context in which the download was resumed
   */
  resuming: { metadataItemID: number; context?: string };

  /**
   * @brief Download stopped
   * @description Emitted when a download is stopped
   * @property {number} metadataItemID The ID of the metadata item being downloaded
   * @property {string} [context] The context in which the download was stopped
   */
  stopped: { metadataItemID: number; context?: string };

  /**
   * @brief Download progress
   * @description Emitted when a download is in progress
   * @property {number} metadataItemID The ID of the metadata item being downloaded
   * @property {number} downloaded The amount of data downloaded so far
   * @property {number} total The total size of the metadata item being downloaded
   * @property {number} seeds The number of seeds available for the download
   * @property {number} peers The number of peers connected for the download
   * @property {number} rate The download rate in bytes per second
   */
  progress: { metadataItemID: number; downloaded: number; total: number; seeds: number; peers: number; rate: number };

  /**
   * @brief Download error
   * @description Emitted when a download fails
   * @property {number} metadataItemID The ID of the metadata item being downloaded
   * @property {Error} error The error that caused the download to fail
   * @property {string} [context] The context in which the download failed
   */
  error: { metadataItemID: number; error: Error; context?: string };
}
