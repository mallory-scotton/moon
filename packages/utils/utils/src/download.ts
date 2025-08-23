/** Dependencies */
import { DownloadOptions, DownloadInformation } from './types';
import { minutes } from './time';
import { extract, ARCHIVE_EXTENSIONS } from './archive';
import { MOON_APPDATA } from '@moon/config';
import { context } from '@moon/context';
import path from 'path';
import fs from 'fs';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'node:stream';

/**
 * @brief Default options for downloading files.
 * @description These options are used when no specific options are provided.
 */
const DEFAULT_DOWNLOAD_OPTIONS: Required<DownloadOptions> = {
  headers: {},
  timeout: minutes(5),
  retries: 3,
  useTemporaryDirectory: true,
  temporaryDirectoryPath: path.join(MOON_APPDATA, 'temp'),
  autoExtract: true,
  emitProgress: true,
  removeArchive: true
};

/**
 * @brief Downloads a file from a URL to a specified destination.
 * @description This function handles the downloading process, including retries and progress reporting.
 * @param url - The URL of the file to download.
 * @param destination - The local path where the file should be saved.
 * @param options - Optional settings for the download process.
 * @returns A promise that resolves when the download is complete.
 * @throws Error if the download fails after all retries.
 * @example
 * await download('https://example.com/file.zip', {
 *   version: '1.0.0',
 *   name: 'file.zip',
 *   type: 'archive',
 *   destination: '/path/to/destination',
 *   filename: 'file.zip'
 * });
 */
export async function download(
  url: string,
  information: DownloadInformation,
  options?: DownloadOptions
): Promise<void> {
  // Merge default options with user-provided options
  const finalOptions: Required<DownloadOptions> = {
    ...DEFAULT_DOWNLOAD_OPTIONS,
    ...(options ? options : {})
  };

  // Ensure destination directory exists
  if (!fs.existsSync(path.dirname(information.destination))) {
    fs.mkdirSync(path.dirname(information.destination), { recursive: true });
  }

  // Ensure temporary directory exists
  if (finalOptions.useTemporaryDirectory && !fs.existsSync(finalOptions.temporaryDirectoryPath)) {
    fs.mkdirSync(finalOptions.temporaryDirectoryPath, { recursive: true });
  }

  // Emit start event
  context.emit('binaries:download:start', { name: information.name, version: information.version });

  // Retry logic
  let retryCount = 0;

  // Download attempt
  const attemptDownload = async (): Promise<void> => {
    // Try downloading the file
    try {
      // Download the file
      const response = await fetch(url, { method: 'GET', headers: finalOptions.headers });

      // Check if the download was successful
      if (!response.ok || !response.body) {
        const error = new Error(`Failed to download ${information.name}: ${response.status} ${response.statusText}`);
        context.emit('binaries:download:error', {
          name: information.name,
          version: information.version,
          error: error,
          context: 'fetch'
        });
        throw error;
      }

      // Convert web stream to Node stream with progress tracking
      const nodeStream = Readable.fromWeb(response.body as any);

      // Get content length from headers
      const contentLength = response.headers.get('content-length');
      const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

      // Track progress if enabled
      if (finalOptions.emitProgress) {
        // Get initial downloaded bytes
        let downloadedBytes = 0;

        // Track download progress
        nodeStream.on('data', (chunk) => {
          // Update downloaded bytes
          downloadedBytes += chunk.length;
          if (totalBytes) {
            // Calculate progress percentage
            const progress = Math.round((downloadedBytes / totalBytes) * 100);
            // Emit progress event
            context.emit('binaries:download:progress', {
              name: information.name,
              version: information.version,
              progress,
              downloadedBytes,
              totalBytes
            });
          }
        });
      }

      // Determine the final destination path
      const destination = finalOptions.useTemporaryDirectory
        ? path.join(finalOptions.temporaryDirectoryPath, information.filename)
        : path.join(information.destination, information.filename);

      // Stream download to a file
      const fileStream = createWriteStream(destination, { mode: 0o755 });

      // Use pipeline to handle the stream
      await pipeline(nodeStream, fileStream);

      // Extract the archive if needed
      if (finalOptions.autoExtract && ARCHIVE_EXTENSIONS.includes(path.extname(url))) {
        await extract(destination, information.destination, information);

        // Remove the archive if needed
        if (finalOptions.removeArchive) {
          fs.unlinkSync(destination);
        }
      } else if (finalOptions.useTemporaryDirectory) {
        // Move the file to the final destination if not extracting
        fs.renameSync(destination, path.join(information.destination, information.filename));
      }

      // Emit completion event
      context.emit('binaries:download:complete', {
        name: information.name,
        version: information.version,
        downloadedBytes: totalBytes,
        path: information.destination
      });
    } catch (error: any) {
      // Handle download errors
      context.emit('binaries:download:error', { name: information.name, version: information.version, error });
      throw error;
    }
  };

  // Timeout and retry logic
  const timeout = setTimeout(() => {
    // Emit timeout event
    context.emit('binaries:download:timeout', { name: information.name, version: information.version });
    // Handle timeout
    throw new Error(`Download timed out after ${finalOptions.timeout} ms`);
  }, finalOptions.timeout);

  // Retry logic
  while (retryCount < finalOptions.retries) {
    try {
      // Attempt the download
      await attemptDownload();
      // Clear the timeout
      clearTimeout(timeout);
      // Exit loop if download is successful
      break;
    } catch (error: any) {
      // Increment retry count and emit retry event
      retryCount++;
      // Reset the timeout
      clearTimeout(timeout);
      // Emit retry event
      context.emit('binaries:download:retry', {
        name: information.name,
        version: information.version,
        attempt: retryCount
      });
      // Check if maximum retries reached
      if (retryCount >= finalOptions.retries) {
        // Emit error event
        context.emit('binaries:download:error', { name: information.name, version: information.version, error });
        // Rethrow the error
        throw error;
      }
    }
  }
}
