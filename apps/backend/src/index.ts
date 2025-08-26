/** Dependencies */
import { Server } from '@moon/server';
import { Database } from '@moon/database';
import apiRouter from './api';

/** Context */
var server: Server | null = null;
var database: Database | null = null;

/**
 * @brief Initialize the application
 * @description Sets up the server and database connections
 */
export async function startBackend() {
  // Initialize server and database
  server = new Server();
  database = new Database();

  // Mount API router
  server.use('/api', apiRouter);

  // Sync database and start server
  await database.sync();
  await server.start();
}

/**
 * @brief Stops the backend services
 * @description This function stops the server and database connections
 */
export async function stopBackend() {
  // Stop server and database
  if (server) {
    await server.stop();
  }
  if (database) {
    await database.close();
  }
}

/** Start the application */
if (require.main === module) {
  /** Initialize backend services */
  startBackend();

  /** Add graceful shutdown */
  process.on('SIGINT', stopBackend);
  process.on('SIGTERM', stopBackend);
}
