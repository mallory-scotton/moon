/** Dependencies */
import { getSource } from './source';
import * as rules from '../rules';

/**
 * @brief Simplifies the title by removing unwanted patterns
 * @description This function takes a title string as input and removes various unwanted patterns
 * from it, returning a simplified version of the title.
 * @param title - The title string to simplify.
 * @returns The simplified title string.
 */
export function simplifyTitle(title: string): string {
  // Create a copy of the title to simplify
  let simplified = title.replace(rules.SIMPLE_TITLE_EXP, '');
  simplified = simplified.replace(rules.WEBSITE_PREFIX_EXP, '');
  simplified = simplified.replace(rules.CLEAN_TORRENT_PREFIX_EXP, '');
  simplified = simplified.replace(rules.CLEAN_TORRENT_SUFFIX_EXP, '');
  simplified = simplified.replace(new RegExp(rules.COMMON_SOURCES_EXP, 'ig'), '');
  simplified = simplified.replace(rules.WEBDL_EXP, '');

  // Get video codec sources
  for (let i = 0; i < 5; i++) {
    // Get the video codec source
    const source = getSource(simplified, rules.VIDEO_CODEC_EXPS);
    if (!source) {
      break;
    }
    // Add the video codec source to the list of patterns to replace
    simplified = simplified.replace(source, '');
  }

  // Trim the title and remove extra whitespace
  return simplified.trim();
}

/**
 * @brief Cleans the release title by removing unwanted patterns
 * @description This function takes a release title string as input and removes various unwanted patterns
 * from it, returning a cleaned version of the title.
 * @param title - The release title string to clean.
 * @returns The cleaned release title string or null if the title is invalid.
 */
export function releaseTitleCleaner(title: string): string | null {
  // Check if the title is valid
  if (!title || title.length === 0 || title === '(') {
    return null;
  }

  // Replace underscores with spaces
  let trimmed = title.replace('_', ' ');

  // Create a list of patterns to replace in the title
  let toReplace: (RegExp | string)[] = [
    rules.REQUEST_INFO_EXP,
    new RegExp(rules.COMMON_SOURCES_EXP, 'ig'),
    rules.WEBDL_EXP,
    rules.EDITION_EXP,
    rules.LANGUAGE_EXP,
    new RegExp(rules.SCENE_GARBAGE_EXP, 'ig'),
    ...Object.keys(rules.LANGUAGE_EXPS).map((lang) => new RegExp(`\\b${lang.toUpperCase()}`))
  ];

  // Remove unwanted patterns from the title
  toReplace.forEach((pattern) => {
    trimmed = trimmed.replace(pattern, '').trim();
  });

  // Remove extra whitespace and unwanted characters
  trimmed = trimmed.split('  ')[0]!.split('..')[0]!;

  // Split the title into parts
  const parts = trimmed.split('.');

  // Process each part of the title
  let result = '';
  let n = 0;
  let previousAcronym = false;
  let nextPart = '';

  // Process each part of the title
  for (const part of parts) {
    // Get the next part if it exists
    if (parts.length >= n + 2) {
      nextPart = parts[n + 1] ?? '';
    }

    if (part.length === 1 && part.toLowerCase() !== 'a' && Number.isNaN(parseInt(part, 10))) {
      // Check if the part is a single character and not a number
      result += part + '.';
      previousAcronym = true;
    } else if (part.toLowerCase() === 'a' && (previousAcronym || nextPart.length === 1)) {
      // Check if the part is 'a' and is preceded by an acronym or followed by a single character
      result += part + '.';
      previousAcronym = true;
    } else {
      // Check if the part is preceded by an acronym
      if (previousAcronym) {
        result += ' ';
        previousAcronym = false;
      }

      result += part + ' ';
    }

    n++;
  }

  // Clean the title
  return result.trim();
}

/**
 * @brief Parse the title and year from a given string.
 * @description This function takes a title string as input and extracts the movie title and release year from it.
 * @param title - The title string to parse.
 * @returns An object containing the parsed title and year.
 */
export function parseTitleAndYear(title: string): { title: string; year: number | null } {
  // Simplify the title
  const simplified = simplifyTitle(title);

  // Remove the group from the simplified title
  const groupless = simplified.replace(/-([a-z0-9]+)$/i, '');

  // Try to match the title and year using the defined regex patterns
  for (const exp of rules.MOVIE_TITLE_YEAR_EXPS) {
    // Get the match result
    const match = exp.exec(groupless);

    if (match?.groups) {
      // If the title is valid, clean it
      const result = releaseTitleCleaner(match.groups.title ?? '');
      if (result === null) {
        continue;
      }
      // If the title is valid, extract the year
      const year = match.groups.year ?? null;

      // If the year is valid, return the parsed title and year
      return { title: result, year: year ? parseInt(year, 10) : null };
    }
  }

  // Get the resolution, video codec, audio channels, and audio codec from the title
  const resolution = getSource(title, rules.RESOLUTION_EXPS);
  const videoCodec = getSource(title, rules.VIDEO_CODEC_EXPS);
  const audioChannels = getSource(title, rules.AUDIO_CHANNELS_EXPS);
  const audioCodec = getSource(title, rules.AUDIO_CODEC_EXPS);

  // Get the positions of each source in the title
  const positions = [
    title.indexOf(resolution ?? ''),
    title.indexOf(videoCodec ?? ''),
    title.indexOf(audioChannels ?? ''),
    title.indexOf(audioCodec ?? '')
  ].filter((pos) => pos > 0);

  // If any positions were found, return the title up to the first position
  if (positions.length > 0) {
    const first = Math.min(...positions);
    return { title: releaseTitleCleaner(title.slice(0, first)) ?? '', year: null };
  }

  // If no valid match is found, return the original title and null year
  return { title: title.trim(), year: null };
}
