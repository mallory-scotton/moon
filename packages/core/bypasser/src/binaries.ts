/** Dependencies */
import os from 'node:os';
import { MOON_APPDATA } from '@moon/config';
import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'node:stream';
import { spawn } from 'child_process';

/** Get the current running platform */
const PLATFORM = os.platform();

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

  // Prepare the temporary folder
  const temp = path.join(MOON_APPDATA, 'temp');
  const archive = path.join(temp, 'flaresolverr.zip');
  const final = path.join(MOON_APPDATA, 'binaries');

  if (!fs.existsSync(temp)) {
    fs.mkdirSync(temp, { recursive: true });
  }

  if (!fs.existsSync(final)) {
    fs.mkdirSync(final, { recursive: true });
  }

  // Download the archive
  const response = await fetch(URL, { method: 'GET' });

  // Check if the download was successful
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download FlareSolverr: ${response.status} ${response.statusText}`);
  }

  // Convert web stream to Node stream
  const nodeStream = Readable.fromWeb(response.body as any);

  // Stream download to a temp file
  const fileStream = createWriteStream(archive, { mode: 0o755 });
  await pipeline(nodeStream, fileStream);

  // Extract the Archive archive
  await extractArchive(archive, final);

  // Delete the Archive
  fs.unlinkSync(archive);

  return final;
}

async function extractArchive(archive: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let cmd: string;
    let args: string[];

    if (archive.endsWith('.zip')) {
      cmd = PLATFORM === 'win32' ? 'powershell' : 'unzip';
      args =
        PLATFORM === 'win32'
          ? ['-Command', `Expand-Archive -Force -Path "${archive}" -DestinationPath "${dest}"`]
          : [archive, '-d', dest];
    } else if (archive.endsWith('.tar.gz')) {
      cmd = 'tar';
      args = ['-xzf', archive, '-C', dest];
    } else {
      return reject(new Error(`Unsupported archive format: ${archive}`));
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}
