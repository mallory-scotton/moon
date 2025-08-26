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
  // Create a list of patterns to replace in the title
  let toReplace: (RegExp | string)[] = [
    rules.SIMPLE_TITLE_EXP,
    rules.WEBSITE_PREFIX_EXP,
    rules.CLEAN_TORRENT_PREFIX_EXP,
    rules.CLEAN_TORRENT_SUFFIX_EXP,
    new RegExp(rules.COMMON_SOURCES_EXP, 'ig'),
    rules.WEBDL_EXP
  ];

  // Get video codec sources
  for (let i = 0; i < 5; i++) {
    // Get the video codec source
    const source = getSource(title, rules.VIDEO_CODEC_EXPS);
    if (!source) {
      break;
    }
    // Add the video codec source to the list of patterns to replace
    toReplace.push(source);
  }

  // Remove unwanted patterns from the title
  toReplace.forEach((pattern) => {
    title = title.replace(pattern, '').trim();
  });

  // Trim the title and remove extra whitespace
  return title.trim();
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

  // Create a list of patterns to replace in the title
  let toReplace: (RegExp | string)[] = [
    '_',
    rules.REQUEST_INFO_EXP,
    new RegExp(rules.COMMON_SOURCES_EXP, 'ig'),
    rules.WEBDL_EXP,
    rules.EDITION_EXP,
    rules.LANGUAGE_EXP,
    new RegExp(rules.SCENE_GARBAGE_EXP, 'ig'),
    ...Object.keys(rules.LANGUAGE_EXPS).map((lang) => {
      return new RegExp(`\\b${lang.toUpperCase()}`, 'ig');
    })
  ];

  // Remove unwanted patterns from the title
  toReplace.forEach((pattern) => {
    title = title.replace(pattern, '').trim();
  });

  // Remove extra whitespace and unwanted characters
  title = title.split('  ')[0]!.split('..')[0]!;

  // Split the title into parts
  const parts = title.split('.');

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
