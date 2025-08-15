/** Dependencies */
import os from 'node:os';
import { MOON_APPDATA } from '@moon/config';
import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'node:stream';

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
 * @brief Downloads the FFprobe binary
 * @description Downloads the FFprobe binary for the specified platform and architecture
 * @param binaryName - The name of the binary to download
 * @throws Error if the download fails
 */
async function downloadFFprobeBinary(binaryName: string) {
  // Create the binary path
  const binaryPath = path.join(MOON_APPDATA, 'binaries', binaryName);
  const response = await fetch(`${RELEASES}/download/${binaryName}`, { method: 'GET' });
  const tempPath = binaryPath + '.download';

  // Check if the download was successful
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${binaryName}: ${response.status} ${response.statusText}`);
  }

  // Convert web stream to Node stream
  const nodeStream = Readable.fromWeb(response.body as any);

  // Stream download to a temp file
  const fileStream = createWriteStream(tempPath, { mode: 0o755 });
  await pipeline(nodeStream, fileStream);

  // Rename atomically
  fs.renameSync(tempPath, binaryPath);

  // On non-Windows, ensure it's executable
  if (PLATFORM !== 'win32') {
    fs.chmodSync(binaryPath, 0o755);
  }
}

/**
 * @brief Get the path of the FFprobe binary or download it if not available
 * @description Get the path of the FFprobe binary or download it if not available
 */
export async function getFFprobeBinaryPath(): Promise<string> {
  // Determine the binary name based on the platform and architecture
  const binaryName = `ffprobe-${PLATFORM}-${ARCH}${PLATFORM === 'win32' ? '.exe' : ''}`;
  const binaryPath = path.join(MOON_APPDATA, 'binaries', binaryName);

  // Check if the binary already exists and is accessible
  try {
    fs.accessSync(binaryPath);
    return binaryPath;
  } catch {}

  // Check if the binary is available for download
  if (!AVAILABLE_BINARIES.includes(binaryName)) {
    throw new Error(`FFprobe binary for ${PLATFORM}-${ARCH} is not available.`);
  }

  // Download the binary
  await downloadFFprobeBinary(binaryName);

  // Return the path to the downloaded binary
  return binaryPath;
}
