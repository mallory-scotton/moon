/**
 * @brief Get the source from the given text using the provided regexes.
 * @description Tries to match the input text against each regex and returns the first captured group.
 * @param text The input text to search.
 * @param regexes A record of named regular expressions to match against the text.
 * @returns The first captured group from the matching regex, or null if no match is found.
 */
export function getSource(text: string, regexes: Record<string, RegExp>): string | null {
  const matchs: RegExpMatchArray[] = [];

  // Iterate over each regex in the record
  for (const [_, regex] of Object.entries(regexes)) {
    // Try to match the text against the regex
    const match = text.match(regex);
    // If a match is found, return the first captured group
    if (match) {
      matchs.push(match);
    }
  }

  // Get the first match in the string
  let index = text.length;
  let firstMatch: RegExpMatchArray | undefined;
  for (const match of matchs) {
    const matchIndex = match.index;
    if (matchIndex !== undefined && matchIndex < index) {
      index = matchIndex;
      firstMatch = match;
    }
  }

  // If no match is found, return null
  return firstMatch ? firstMatch[0] : null;
}
