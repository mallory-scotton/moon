/** Dependencies */
import { Server } from '@moon/server';
import { Database } from '@moon/database';
import apiRouter from './api';

/**
 * @brief Initialize the application
 * @description Sets up the server and database connections
 */
async function main() {
  // Initialize server and database
  const server = new Server();
  const database = new Database();

  // Mount API router
  server.use('/api', apiRouter);

  // Sync database and start server
  await database.sync();
  await server.start();
}

/** Start the application */
main();
