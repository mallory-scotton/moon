/**
 * @brief Server event map interface
 * @description Maps the events emitted by the server to their payloads.
 */
export interface ServerEventMap {
  /**
   * @brief Server started event
   * @description Emitted when the server has started.
   * @property {number} port - The port the server is running on.
   * @property {string} host - The host the server is running on.
   */
  started: { port: number; host: string };

  /**
   * @brief Server stopped event
   * @description Emitted when the server has stopped.
   * @property {string} reason - The reason the server stopped.
   */
  stopped: { reason: string };

  /**
   * @brief Server error event
   * @description Emitted when the server encounters an error.
   * @property {Error} error - The error that occurred.
   * @property {string} [context] - Optional context about the error.
   */
  error: { error: Error; context?: string };
}
