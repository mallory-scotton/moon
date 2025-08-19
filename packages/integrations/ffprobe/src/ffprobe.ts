/** Dependencies */
import { getFFprobeBinaryPath } from './binaries';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { FFProbeResult, FFProbeStream, FFProbeChapter, FFProbeFormat } from './types';

/**
 * @brief FFprobe class for handling media file analysis
 * @description This class provides methods to interact with the FFprobe binary for extracting metadata from media files.
 */
export class FFprobe {
  /** Class members */
  private _binaryPath: string | null;

  /**
   * @brief FFprobe constructor
   * @description Initializes the FFprobe instance and sets the binary path.
   */
  constructor() {
    this._binaryPath = null;
  }

  /**
   * @brief Get the FFprobe binary path
   * @description Retrieves the path to the FFprobe binary, downloading it if necessary.
   */
  private async _getBinaryPath(): Promise<string> {
    // Check if the binary path is already set
    if (this._binaryPath) {
      return this._binaryPath;
    }

    // If the binary path is not set, retrieve it
    this._binaryPath = await getFFprobeBinaryPath();
    return this._binaryPath;
  }

  /**
   * @brief Run FFprobe with the given arguments
   * @description Executes the FFprobe binary with the specified arguments and returns the parsed JSON output.
   * @param args - The arguments to pass to the FFprobe command.
   * @returns A promise that resolves to the parsed JSON output from FFprobe.
   * @throws Error if the FFprobe command fails or the output is not valid JSON.
   */
  private async _run(args: string[]): Promise<any> {
    // Add the -f json flag to the arguments
    args.push('-v quiet', '-hide_banner', '-print_format json');

    // Get the binary path
    const binaryPath = await this._getBinaryPath();

    // Run the FFprobe command
    return new Promise((resolve, reject) => {
      exec(`${binaryPath} ${args.join(' ')}`, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${stderr}`);
        } else {
          try {
            resolve(JSON.parse(stdout));
          } catch (parseError) {
            reject(`Error parsing JSON: ${parseError}`);
          }
        }
      });
    });
  }

  /**
   * @brief Get the streams from a media file
   * @description Retrieves the streams information from the specified media file using FFprobe.
   * @param filePath - The path to the media file.
   * @returns A promise that resolves to the streams information.
   * @throws Error if the FFprobe command fails or the output is not valid JSON.
   */
  public async getStreams(filePath: string): Promise<FFProbeStream[]> {
    // Resolve the file path
    const resolvedPath = path.resolve(filePath);

    // Check if the file exists
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found: ${resolvedPath}`);
    }

    // Run the FFprobe command
    return (await this._run([`-i ${resolvedPath}`, '-show_streams']))?.streams;
  }

  /**
   * @brief Get the format information from a media file
   * @description Retrieves the format information from the specified media file using FFprobe.
   * @param filePath - The path to the media file.
   * @returns A promise that resolves to the format information.
   * @throws Error if the FFprobe command fails or the output is not valid JSON.
   */
  public async getFormat(filePath: string): Promise<FFProbeFormat> {
    // Resolve the file path
    const resolvedPath = path.resolve(filePath);

    // Check if the file exists
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found: ${resolvedPath}`);
    }

    // Run the FFprobe command
    return (await this._run([`-i ${resolvedPath}`, '-show_format']))?.format;
  }

  /**
   * @brief Get the chapters from a media file
   * @description Retrieves the chapters information from the specified media file using FFprobe.
   * @param filePath - The path to the media file.
   * @returns A promise that resolves to the chapters information.
   * @throws Error if the FFprobe command fails or the output is not valid JSON.
   */
  public async getChapters(filePath: string): Promise<FFProbeChapter[]> {
    // Resolve the file path
    const resolvedPath = path.resolve(filePath);

    // Check if the file exists
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found: ${resolvedPath}`);
    }

    // Run the FFprobe command
    return (await this._run([`-i ${resolvedPath}`, '-show_chapters']))?.chapters;
  }

  /**
   * @brief Get the metadata from a media file
   * @description Retrieves the metadata information from the specified media file using FFprobe.
   * @param filePath - The path to the media file.
   * @returns A promise that resolves to the metadata information.
   * @throws Error if the FFprobe command fails or the output is not valid JSON.
   */
  public async getMediaInfo(filePath: string): Promise<FFProbeResult> {
    // Resolve the file path
    const resolvedPath = path.resolve(filePath);

    // Check if the file exists
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found: ${resolvedPath}`);
    }

    // Run the FFprobe command
    return this._run([`-i ${resolvedPath}`, '-show_format', '-show_streams', '-show_chapters']);
  }
}
