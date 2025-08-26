/**
 * @brief Get the source from the given text using the provided regexes.
 * @description Tries to match the input text against each regex and returns the first captured group.
 * @param text The input text to search.
 * @param regexes A record of named regular expressions to match against the text.
 * @returns The first captured group from the matching regex, or null if no match is found.
 */
export function getSource(text: string, regexes: Record<string, RegExp>): string | null {
  // Iterate over each regex in the record
  for (const [_, regex] of Object.entries(regexes)) {
    // Try to match the text against the regex
    const match = text.match(regex);
    // If a match is found, return the first captured group
    if (match) {
      return match[0];
    }
  }
  // If no match is found, return null
  return null;
}
