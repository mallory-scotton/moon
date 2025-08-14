/**
 * @brief Database options interface
 * @description This interface defines the options for the database connection.
 * @example
 * const options: DatabaseOptions = {
 *   location: '/path/to/database'
 * };
 */
export interface DatabaseOptions {
  /**
   * @brief Database location
   * @description This option specifies the location of the database.
   */
  location?: string;
}
