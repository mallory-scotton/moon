/** Dependencies */
import express, { Express, RequestHandler } from 'express';
import { createServer, Server as HttpServer } from 'node:http';
import helmet from 'helmet';
import compression from 'compression';
import type { ServerOptions, MiddlewareConfig } from './types';
import { TypedEventEmitter } from '@moon/types';
import { Logger } from '@moon/logger';
import { config } from '@moon/config';

/**
 * @brief Default server options
 * @description These are the default options for the server.
 */
const DEFAULT_SERVER_OPTIONS: Required<ServerOptions> = {
  port: config.server.port,
  host: config.server.host,
  enableCors: config.server.cors,
  middlewares: [],
  onStart: () => {},
  onError: () => {}
};

/**
 * @brief Server error class
 * @description This class represents an error that occurs within the server.
 */
class ServerError extends Error {
  /**
   * @brief Server error constructor
   * @description This constructor creates a new ServerError instance.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(`[ServerError] ${message}`);
    this.name = 'ServerError';
  }
}

/**
 * @brief Server events
 * @description This interface defines the events emitted by the server.
 */
interface ServerEvents {
  /**
   * @brief Server start event
   * @description This event is triggered when the server starts.
   * @param options - The server options.
   * @example
   * server.on('started', (options) => {
   *   console.log('Server started on', options.host, options.port);
   * });
   */
  started: (options: Required<ServerOptions>) => void;

  /**
   * @brief Server error event
   * @description This event is triggered when the server encounters an error.
   * @param error - The error object.
   * @example
   * server.on('error', (error) => {
   *   console.error('Server error', error);
   * });
   */
  error: (error: Error) => void;

  /**
   * @brief Server stopped event
   * @description This event is triggered when the server stops.
   * @example
   * server.on('stopped', () => {
   *   console.log('Server stopped');
   * });
   */
  stopped: () => void;
}

/**
 * @brief Server class
 * @description This class represents the server.
 * @example
 * const server = new Server({
 *   port: 3000,
 *   host: 'localhost'
 * });
 *
 * server.get('/', (req, res) => {
 *   res.send('Hello World!');
 * });
 *
 * await server.start();
 */
export class Server extends TypedEventEmitter<ServerEvents> {
  /** Class properties */
  private _app: Express;
  private _server: HttpServer | null = null;
  private readonly _options: Required<ServerOptions>;
  private readonly _logger: Logger;

  /**
   * @brief Server options
   * @description This function returns the server options.
   * @param options - The server options.
   * @throws An error if the options are invalid.
   */
  constructor(options?: ServerOptions) {
    // Call the parent constructor
    super();

    // Initialize the logger
    this._logger = new Logger({ namespace: 'Server' });

    // Freeze the options
    this._options = Object.freeze({
      ...DEFAULT_SERVER_OPTIONS,
      ...options
    }) as Required<ServerOptions>;

    // Initialize the Express application
    this._app = express();

    // Validate the options
    this.validateOptions();
    this.applyDefaultMiddleware();
  }

  /**
   * @brief Get server options
   * @description This function returns the server options.
   * @returns The server options.
   * @throws An error if the options are invalid.
   */
  private validateOptions(): void {
    // Validate the port and host
    const { port, host } = this._options;

    // Validate the port
    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
      throw new ServerError(`Invalid port number: ${port}`);
    }

    // Validate the host
    if (typeof host !== 'string' || !host.trim()) {
      throw new ServerError(`Invalid host: "${host}"`);
    }
  }

  /**
   * @brief Get server options
   * @description This function returns the server options.
   * @returns The server options.
   * @throws An error if the options are invalid.
   */
  private applyDefaultMiddleware(): void {
    // Add default middleware
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(helmet());
    this._app.use(compression());

    // Enable CORS if specified in options
    if (this._options.enableCors) {
      // Lazy load cors to avoid dependency if unused
      import('cors')
        .then(({ default: cors }) => this._app.use(cors()))
        .catch(() => {
          this._logger.warn('[Server] CORS enabled in options but "cors" package not installed.');
        });
    }

    // Register custom middlewares
    if (Array.isArray(this._options.middlewares)) {
      for (const middleware of this._options.middlewares) {
        this.registerMiddleware(middleware);
      }
    }
  }

  /**
   * @brief Register middleware
   * @description This function registers a middleware for the server.
   * @param middleware - The middleware to register.
   * @returns The server instance.
   * @throws An error if the middleware is invalid.
   * @example
   * server.registerMiddleware((req, res, next) => {
   *   console.log('Request received');
   *   next();
   * });
   */
  public registerMiddleware(middleware: MiddlewareConfig | RequestHandler): this {
    if (typeof middleware === 'function') {
      // Register middleware
      this._app.use(middleware);
    } else if (middleware && typeof middleware.handler === 'function') {
      // Register middleware with path
      this._app.use(middleware.path ?? '/', middleware.handler);
    } else {
      // Invalid middleware configuration
      throw new ServerError('Invalid middleware configuration');
    }
    // Middleware registered successfully
    return this;
  }

  /**
   * @brief Start the server
   * @description This function starts the server.
   * @returns The server instance.
   * @throws An error if the server fails to start.
   * @example
   * await server.start();
   */
  public async start(): Promise<void> {
    // Check if server is already running
    if (this._server) {
      throw new ServerError('Server is already running.');
    }

    // Create the server
    this._server = createServer(this._app);

    // Start the server
    await new Promise<void>((resolve) => {
      // Listen for incoming connections
      this._server!.listen(this._options.port, this._options.host, () => {
        // Server started successfully
        this.emit('started', this._options);
        // Call onStart callback
        this._options.onStart?.();
        // Log server information
        this._logger.info(`Listening on http://${this._options.host}:${this._options.port}`);
        // Resolve the promise
        resolve();
      });
    });

    // Handle server errors
    this._server.on('error', (error) => {
      // Call onError callback
      this._options.onError?.(error);
      // Emit error event
      this.emit('error', error);
    });
  }

  /**
   * @brief Get server options
   * @description This function returns the server options.
   * @returns The server options.
   * @throws An error if the options are invalid.
   * @example
   * await server.stop();
   */
  public async stop(): Promise<void> {
    // Check if server is running
    if (!this._server) {
      throw new ServerError('Server is not running.');
    }

    // Stop the server
    await new Promise<void>((resolve, reject) => {
      // Close the server
      this._server!.close((error) => {
        if (error) {
          // Call onError callback
          this._options.onError?.(error);
          // Emit error event
          this.emit('error', error);
          // Handle error during server shutdown
          reject(error);
        } else {
          // Server stopped successfully
          this.emit('stopped');
          // Log server information
          this._logger.info('Server stopped');
          // Clear server instance
          this._server = null;
          // Resolve the promise
          resolve();
        }
      });
    });
  }

  /**
   * @brief Get the Express application instance
   * @description This function returns the Express application instance.
   * @returns The Express application instance.
   */
  public getApp(): Readonly<Express> {
    return this._app;
  }

  /**
   * @brief Serve static files
   * @description This function serves static files from a directory.
   * @param path - The path to serve the static files.
   * @param directory - The directory containing the static files.
   * @returns The server instance.
   * @example
   * server.serveStatic('/static', 'public/static');
   */
  public serveStatic(path: string, directory: string): this {
    this._app.use(path, express.static(directory));
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.use('/api', apiRouter);
   */
  public use(path: string, handler: RequestHandler): this {
    this._app.use(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.get('/api/users', (req, res) => {
   *   res.send('User list');
   * });
   */
  public get(path: string, handler: RequestHandler): this {
    this._app.get(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.post('/api/users', (req, res) => {
   *   res.send('User created');
   * });
   */
  public post(path: string, handler: RequestHandler): this {
    this._app.post(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.delete('/api/users/:id', (req, res) => {
   *   res.send('User deleted');
   * });
   */
  public delete(path: string, handler: RequestHandler): this {
    this._app.delete(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.put('/api/users/:id', (req, res) => {
   *   res.send('User updated');
   * });
   */
  public put(path: string, handler: RequestHandler): this {
    this._app.put(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.options('/api/users/:id', (req, res) => {
   *   res.send('User options');
   * });
   */
  public options(path: string, handler: RequestHandler): this {
    this._app.options(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.patch('/api/users/:id', (req, res) => {
   *   res.send('User updated');
   * });
   */
  public patch(path: string, handler: RequestHandler): this {
    this._app.patch(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.head('/api/users/:id', (req, res) => {
   *   res.send('User head');
   * });
   */
  public head(path: string, handler: RequestHandler): this {
    this._app.head(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.connect('/api/users/:id', (req, res) => {
   *   res.send('User connected');
   * });
   */
  public connect(path: string, handler: RequestHandler): this {
    this._app.connect(path, handler);
    return this;
  }

  /**
   * @brief Register a route
   * @description This function registers a route for the server.
   * @param path - The path of the route.
   * @param handler - The request handler for the route.
   * @returns The server instance.
   * @example
   * server.trace('/api/users/:id', (req, res) => {
   *   res.send('User traced');
   * });
   */
  public trace(path: string, handler: RequestHandler): this {
    this._app.trace(path, handler);
    return this;
  }

  /**
   * @brief Check if the server is running
   * @description This function checks if the server is currently running.
   * @returns True if the server is running, false otherwise.
   * @example
   * const isRunning = server.isRunning();
   * console.log(`Server is ${isRunning ? 'running' : 'stopped'}`);
   */
  public isRunning(): boolean {
    return Boolean(this._server?.listening);
  }
}
