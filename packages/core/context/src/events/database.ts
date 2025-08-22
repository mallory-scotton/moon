/**
 * @brief Database events
 * @description Events emitted by the database.
 */
export interface DatabaseEventMap {
  /**
   * @brief Database connected event
   * @description Emitted when the database connection is established.
   * @property {string} uri - The URI of the database.
   */
  connected: { uri: string };

  /**
   * @brief Database disconnected event
   * @description Emitted when the database connection is lost.
   * @property {string} reason - The reason the connection was lost.
   */
  disconnected: { reason: string };

  /**
   * @brief Database error event
   * @description Emitted when the database encounters an error.
   * @property {Error} error - The error that occurred.
   * @property {string} [context] - Optional context about the error.
   */
  error: { error: Error; context?: string };

  /**
   * @brief Database synchronized event
   * @description Emitted when the database is synchronized.
   * @property {boolean} force - Whether the synchronization was forced.
   */
  synchronized: { force: boolean };
}
