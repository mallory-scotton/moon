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
  'ffmpeg-darwin-arm64',
  'ffmpeg-darwin-x64',
  'ffmpeg-linux-amd64',
  'ffmpeg-linux-arm64',
  'ffmpeg-linux-armel',
  'ffmpeg-linux-armhf',
  'ffmpeg-linux-i686',
  'ffmpeg-win32-x64.exe'
];

/**
 * @brief Get the path of the FFmpeg binary or download it if not available
 * @description Get the path of the FFmpeg binary or download it if not available
 * @returns The path to the FFmpeg binary
 * @throws Error if the binary is not available for download
 */
export async function getFFmpegBinaryPath(): Promise<string> {
  // Determine the binary name based on the platform and architecture
  const platformSpecificName = `ffmpeg-${PLATFORM}-${ARCH}${PLATFORM === 'win32' ? '.exe' : ''}`;
  const finalPath = path.join(MOON_APPDATA, 'binaries');
  const binaryName = `ffmpeg${PLATFORM === 'win32' ? '.exe' : ''}`;
  const binaryPath = path.join(finalPath, binaryName);

  // Check if the binary already exists and is accessible
  try {
    fs.accessSync(binaryPath);
    return binaryPath;
  } catch {}

  // Check if the binary is available for download
  if (!AVAILABLE_BINARIES.includes(binaryName)) {
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
      name: 'ffmpeg'
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
