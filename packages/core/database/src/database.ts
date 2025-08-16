/** Dependencies */
import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import { DatabaseOptions } from './types';
import { Logger } from '@moon/logger';
import path from 'path';
import fs from 'fs';
import * as Models from './models';
import { MOON_DATABASE_PATH } from '@moon/config';

/**
 * @brief Default options for the database connection.
 * @description These are the default options for the database connection.
 */
const DEFAULT_DATABASE_OPTIONS: Required<DatabaseOptions> = {
  location: MOON_DATABASE_PATH
};

/**
 * @brief Database error class
 * @description This class represents an error that occurs within the database.
 */
class DatabaseError extends Error {
  /**
   * @brief Database error constructor
   * @description This constructor creates a new DatabaseError instance.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(`[DatabaseError] ${message}`);
    this.name = 'DatabaseError';
  }
}

/**
 * @brief Database class
 * @description This class represents the database connection.
 * @example
 * const db = new Database({
 *   location: '/path/to/database'
 * });
 */
export class Database {
  /** Class members */
  private _sequelize: Sequelize | null = null;
  private readonly _options: Required<DatabaseOptions>;
  private readonly _logger: Logger;

  /**
   * @brief Database options
   * @description This function returns the database options.
   * @param options - The database options.
   * @throws An error if the options are invalid.
   */
  constructor(options?: DatabaseOptions) {
    // Initialize the logger
    this._logger = new Logger({ namespace: 'Database' });

    // Merge default and user-provided options
    this._options = { ...DEFAULT_DATABASE_OPTIONS, ...options };

    // Ensure database location exists
    this.ensureDatabaseLocation();

    // Initialize Sequelize
    this._sequelize = new Sequelize({
      dialect: SqliteDialect,
      storage: this._options.location,
      logging: false,
      models: [...Object.values(Models)]
    });
  }

  /**
   * @brief Ensure database location exists
   * @description This function ensures that the database location exists.
   * @example
   * db.ensureDatabaseLocation();
   */
  private ensureDatabaseLocation() {
    // Check if the database directory exists
    if (!fs.existsSync(path.dirname(this._options.location))) {
      fs.mkdirSync(path.dirname(this._options.location), { recursive: true });
    }
  }

  /**
   * @brief Ensure database location exists
   * @description This function ensures that the database location exists.
   * @param force - Whether to force the creation of the database directory.
   * @throws An error if the database directory cannot be created.
   * @example
   * db.sync();
   */
  public async sync(force = false): Promise<void> {
    // Check if the database connection is established
    if (!this._sequelize) {
      throw new DatabaseError('Database connection is not established.');
    }

    try {
      // Synchronize the database
      await this._sequelize?.sync({ force });
      this._logger.info('Database synchronized successfully.');
    } catch (error) {
      // Handle errors
      throw new DatabaseError(`Error syncing database: ${error}`);
    }
  }

  /**
   * @brief Ensure database connection is closed
   * @description This function ensures that the database connection is closed.
   * @throws An error if the database connection is not established.
   * @example
   * db.close();
   */
  public async close(): Promise<void> {
    // Check if the database connection is established
    if (!this._sequelize) {
      throw new DatabaseError('Database connection is not established.');
    }

    try {
      // Close the database connection
      await this._sequelize?.close();
      this._logger.info('Database connection closed successfully.');
    } catch (error) {
      // Handle errors
      throw new DatabaseError(`Error closing database connection: ${error}`);
    }
  }
}
