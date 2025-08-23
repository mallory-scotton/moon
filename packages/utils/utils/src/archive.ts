/** Dependencies */
import decompress from 'decompress';
import { context } from '@moon/context';
import { DownloadInformation } from './types';

/**
 * @brief Supported archive file extensions.
 * @description This constant holds the list of file extensions that are considered archive files.
 */
export const ARCHIVE_EXTENSIONS = ['.zip', '.tar', '.gz', '.7z', '.rar'];

/**
 * @brief Extracts an archive file to a specified destination.
 * @description This function uses the `tar` command to extract the archive.
 * @param source - The path to the archive file to be extracted.
 * @param destination - The directory where the archive should be extracted.
 * @returns A promise that resolves when the extraction is complete.
 * @throws Error if the extraction fails.
 * @example
 * await extract('/path/to/archive.tar.gz', '/path/to/destination');
 */
export async function extract(source: string, destination: string, information: DownloadInformation): Promise<void> {
  try {
    // Emit start event
    context.emit('binaries:extract:start', {
      version: information.version,
      name: information.name,
      archive: source,
      destination
    });
    // Extract the archive
    await decompress(source, destination);
    // Emit success event
    context.emit('binaries:extract:complete', {
      version: information.version,
      name: information.name,
      destination
    });
  } catch (error: any) {
    // Emit error event
    context.emit('binaries:extract:error', {
      version: information.version,
      name: information.name,
      archive: source,
      destination,
      error
    });
    // Rethrow the error
    throw new Error(`Failed to extract ${source}: ${error}`);
  }
}
