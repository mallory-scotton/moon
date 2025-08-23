/** Dependencies */
import os from 'node:os';
import { MOON_APPDATA } from '@moon/config';
import { download, minutes } from '@moon/utils';
import path from 'path';

/** Get the current running platform */
const PLATFORM = os.platform();

/**
 * @brief Downloads the specified version of FlareSolverr.
 * @description This function downloads the FlareSolverr binary for the current platform.
 * @param version - The version of FlareSolverr to download.
 * @returns The path to the downloaded FlareSolverr binary.
 * @throws An error if the download fails.
 */
export async function downloadFlareSolverr(version: string = 'v3.3.25') {
  // Determine the download URL based on the platform
  let URL = '';
  if (PLATFORM === 'win32') {
    URL = `https://github.com/FlareSolverr/FlareSolverr/releases/download/${version}/flaresolverr_windows_x64.zip`;
  } else if (PLATFORM === 'linux' || PLATFORM === 'darwin') {
    URL = `https://github.com/FlareSolverr/FlareSolverr/releases/download/${version}/flaresolverr_linux_x64.tar.gz`;
  } else {
    throw new Error(`Unsupported platform: ${PLATFORM}`);
  }

  // Determine the destination path
  const destination = path.join(MOON_APPDATA, 'binaries');

  // Download the FlareSolverr binary
  await download(
    URL,
    {
      version,
      name: 'FlareSolverr',
      destination,
      type: 'archive',
      filename: 'flaresolverr.zip'
    },
    {
      autoExtract: true,
      useTemporaryDirectory: true,
      temporaryDirectoryPath: path.join(MOON_APPDATA, 'temp'),
      emitProgress: true,
      removeArchive: true,
      retries: 2,
      timeout: minutes(10)
    }
  );

  return path.join(destination, 'flaresolverr');
}
