/**
 * @brief Extracts fields from a text string based on the provided regex patterns.
 * @param text The text string to extract fields from.
 * @param regexes A record of regex patterns to match against the text.
 * @returns An object containing the extracted fields.
 */
export function getFields<T extends string>(
  text: string,
  regexes: { [K in T]: RegExp }
): {
  [K in T]?: boolean;
} {
  // Initialize an empty array to hold the captured groups
  const fields: { [K in T]?: boolean } = {};
  // Iterate over each regex in the record
  for (const key in regexes) {
    const regex = regexes[key];
    // Try to match the text against the regex
    const match = text.match(regex);
    // If a match is found, add the first captured group to the fields array
    if (match) {
      fields[key] = true;
    }
  }
  // Return the array of captured groups
  return fields;
}
