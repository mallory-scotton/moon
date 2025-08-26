/** Dependencies */
import { FilenameParseResult, TvFilenameParseResult, BaseFilenameParseResult } from './types';
import * as utils from './utils';
import * as rules from './rules';

/**
 * @brief Parses a filename into its components.
 * @description This function takes a filename and extracts various metadata from it, such as title, year, season, episode, etc.
 * @param filename - The filename to parse.
 * @param isTv - Whether the content is a TV show or a movie.
 * @returns An object containing the parsed metadata.
 * @throws An error if the filename is invalid or cannot be parsed.
 */
export function parseFilename(filename: string, isTv: true): TvFilenameParseResult;
export function parseFilename(filename: string, isTv: false): BaseFilenameParseResult;
export function parseFilename(filename: string, isTv: boolean): FilenameParseResult {
  return {};
}

/**
 * @brief Parses a movie filename into its components.
 * @description This function takes a movie filename and extracts various metadata from it, such as title, year, etc.
 * @param filename - The movie filename to parse.
 * @returns An object containing the parsed metadata.
 * @throws An error if the filename is invalid or cannot be parsed.
 */
export function parseMovieFilename(filename: string): BaseFilenameParseResult {
  return parseFilename(filename, false);
}

/**
 * @brief Parses a TV show filename into its components.
 * @description This function takes a TV show filename and extracts various metadata from it, such as title, year, season, episode, etc.
 * @param filename - The TV show filename to parse.
 * @returns An object containing the parsed metadata.
 * @throws An error if the filename is invalid or cannot be parsed.
 */
export function parseTvFilename(filename: string): TvFilenameParseResult {
  return parseFilename(filename, true);
}
