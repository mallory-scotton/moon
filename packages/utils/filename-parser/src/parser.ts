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
  // Parse the title and year from the filename
  const parsedTitle = utils.parseTitleAndYear(filename);
  const withoutTitle = filename.replace(/\./g, ' ').replace(parsedTitle.title, '').toLowerCase();

  // Initialize variables for title and year
  let title: FilenameParseResult['title'] = parsedTitle.title ?? undefined;
  let year: FilenameParseResult['year'] = parsedTitle.year ?? undefined;

  // Extract languages from the filename
  let languages = utils.getFields(withoutTitle, rules.LANGUAGE_EXPS, true);

  // Ensure at least English is included
  if (languages.length === 0 || (languages.includes('multi') && !languages.includes('english'))) {
    languages.push('english');
  }

  // Return the filtered result
  return utils.filterEmpty({
    title: title,
    year: year,
    audioChannels: utils.getValue(filename, rules.AUDIO_CHANNELS_EXPS) ?? undefined,
    audioCodec: utils.getValue(filename, rules.AUDIO_CODEC_EXPS) ?? undefined,
    videoCodec: utils.getValue(filename, rules.VIDEO_CODEC_EXPS) ?? undefined,
    edition: utils.getFields(withoutTitle, rules.EDITION_EXPS, false),
    languages: languages,
    multi: languages.includes('multi')
  } as FilenameParseResult);
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
