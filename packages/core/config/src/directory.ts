/** Dependencies */
import fs from 'fs';
import path from 'path';

/**
 * @brief Creates a directory tree based on the provided object structure.
 * @description This function creates a directory tree based on the provided object structure.
 * @param tree - The object structure representing the directory tree.
 * @param basePath - The base path where the directory tree should be created.
 * @example
 * createDirectoryTree({
 *   'src': {
 *     'index.ts': 'console.log("Hello, world!");',
 *     'utils': {
 *       'helper.ts': 'export function helper() {}'
 *     }
 *   }
 * }, '/path/to/project');
 */
export function createDirectoryTree(tree: object, basePath: string): void {
  for (const [key, value] of Object.entries(tree)) {
    const targetPath = path.join(basePath, key);
    if (typeof value === 'object' && value !== null) {
      // Create the directory if it doesn't exist
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      createDirectoryTree(value, targetPath);
    } else if (typeof value === 'string') {
      // Ensure parent directory exists
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      // Create the file with the given content if it doesn't exist
      if (!fs.existsSync(targetPath)) {
        fs.writeFileSync(targetPath, value, { encoding: 'utf8' });
      }
    }
  }
}
