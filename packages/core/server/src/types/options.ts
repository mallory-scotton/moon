/** Dependencies */
import type { RequestHandler } from 'express';

/**
 * @brief Configuration for middleware in the server.
 * @description This interface defines the configuration options for middleware in the server.
 * @example
 * const middleware: MiddlewareConfig = {
 *   path: '/api',
 *   handler: (req, res, next) => {
 *     // Middleware logic
 *     next();
 *   }
 * };
 */
export interface MiddlewareConfig {
  /**
   * @brief The path for the middleware.
   * @description This defines the path for the middleware to be applied.
   */
  path?: string;

  /**
   * @brief The handler for the middleware.
   * @description This defines the function to be executed for the middleware.
   */
  handler: RequestHandler;
}

/**
 * @brief Configuration options for the server.
 * @description This interface defines the configuration options for the server.
 */
export interface ServerOptions {
  /**
   * @brief The port for the server.
   * @description This defines the port for the server to listen on.
   * @default 45001
   */
  port?: number;

  /**
   * @brief The host for the server.
   * @description This defines the host for the server to listen on.
   * @default '0.0.0.0'
   */
  host?: string;

  /**
   * @brief Enable CORS for the server.
   * @description This defines whether to enable CORS for the server.
   * @default false
   */
  enableCors?: boolean;

  /**
   * @brief Middleware configuration
   * @description This defines the middleware configuration for the server.
   * @example
   * const middleware: MiddlewareConfig = {
   *   path: '/api',
   *   handler: (req, res, next) => {
   *     // Middleware logic
   *     next();
   *   }
   * };
   *
   * serverConfig.middlewares = [middleware];
   */
  middlewares?: Array<MiddlewareConfig | RequestHandler>;

  /**
   * @brief Server start event
   * @description This event is triggered when the server starts.
   * @example
   * serverConfig.onStart = () => {
   *   console.log('Server started');
   * };
   */
  onStart?: () => void | Promise<void>;

  /**
   * @brief Server error event
   * @description This event is triggered when the server encounters an error.
   * @example
   * serverConfig.onError = (err) => {
   *   console.error('Server error', err);
   * };
   */
  onError?: (err: unknown) => void | Promise<void>;
}
