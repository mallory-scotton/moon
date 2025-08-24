/** Dependencies */
import os from 'node:os';
import { MOON_APPDATA } from '@moon/config';
import fs from 'fs';
import path from 'path';
import { download, minutes } from '@moon/utils';

/** Constants */
const PLATFORM = os.platform();
const ARCH = os.arch();
const RELEASES = 'https://github.com/mallory-scotton/ff-static-binaries/releases/latest';
const AVAILABLE_BINARIES = [
  'ffprobe-darwin-arm64',
  'ffprobe-darwin-x64',
  'ffprobe-linux-amd64',
  'ffprobe-linux-arm64',
  'ffprobe-linux-armel',
  'ffprobe-linux-armhf',
  'ffprobe-linux-i686',
  'ffprobe-win32-x64.exe'
];

/**
 * @brief Get the path of the FFprobe binary or download it if not available
 * @description Get the path of the FFprobe binary or download it if not available
 * @returns The path to the FFprobe binary
 * @throws Error if the binary is not available for download
 */
export async function getFFprobeBinaryPath(): Promise<string> {
  // Determine the binary name based on the platform and architecture
  const platformSpecificName = `ffprobe-${PLATFORM}-${ARCH}${PLATFORM === 'win32' ? '.exe' : ''}`;
  const finalPath = path.join(MOON_APPDATA, 'binaries');
  const binaryName = `ffprobe${PLATFORM === 'win32' ? '.exe' : ''}`;
  const binaryPath = path.join(finalPath, binaryName);

  // Check if the binary already exists and is accessible
  try {
    fs.accessSync(binaryPath);
    return binaryPath;
  } catch {}

  // Check if the binary is available for download
  if (!AVAILABLE_BINARIES.includes(platformSpecificName)) {
    throw new Error(`FFprobe binary for ${PLATFORM}-${ARCH} is not available.`);
  }

  // Create download URL
  const URL = `${RELEASES}/download/${platformSpecificName}`;

  // Download the binary
  await download(
    URL,
    {
      destination: finalPath,
      filename: binaryName,
      type: 'binary',
      version: '7.0.2',
      name: 'ffprobe'
    },
    {
      useTemporaryDirectory: true,
      temporaryDirectoryPath: path.join(MOON_APPDATA, 'temp'),
      autoExtract: false,
      emitProgress: true,
      removeArchive: false,
      retries: 3,
      timeout: minutes(5)
    }
  );

  // Return the path to the downloaded binary
  return binaryPath;
}
