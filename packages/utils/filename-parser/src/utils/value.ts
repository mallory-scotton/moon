/**
 * @brief Extracts a value from a string using a set of regular expressions.
 * @description Tries to match the input text against each regex and returns the first captured group.
 * @param text The input text to search.
 * @param regexes A record of named regular expressions to match against the text.
 * @returns The first captured group from the matching regex, or null if no match is found.
 */
export function getValue(text: string, regexes: Record<string, RegExp>): string | null {
  // Iterate over each regex in the record
  for (const [value, regex] of Object.entries(regexes)) {
    // Test the regex against the text
    if (regex.test(text)) {
      return value;
    }
  }
  // If no match is found, return null
  return null;
}

/**
 * @brief Extracts all matching values from a string using a set of regular expressions.
 * @description Tries to match the input text against each regex and returns an array of all captured groups.
 * @param text The input text to search.
 * @param regexes A record of named regular expressions to match against the text.
 * @returns An array of all captured groups from the matching regexes, or null if no matches are found.
 */
export function getValues(text: string, regexes: Record<string, RegExp>): string[] | null {
  // Initialize an array to hold the matching values
  const values: string[] = [];
  // Iterate over each regex in the record
  for (const [value, regex] of Object.entries(regexes)) {
    // Test the regex against the text
    if (regex.test(text)) {
      values.push(value);
    }
  }
  // Return the array of matching values, or null if no matches are found
  return values.length > 0 ? values : null;
}
