/**
 * @brief Extracts fields from a text string based on the provided regex patterns.
 * @param text The text string to extract fields from.
 * @param regexes A record of regex patterns to match against the text.
 * @returns An object containing the extracted fields.
 */
export function getFields<T extends string>(
  text: string,
  regexes: { [K in T]: RegExp },
  asArray: false
): { [K in T]?: boolean };
export function getFields<T extends string>(text: string, regexes: { [K in T]: RegExp }, asArray: true): T[];
export function getFields<T extends string>(
  text: string,
  regexes: { [K in T]: RegExp },
  asArray: boolean
): { [K in T]?: boolean } | T[] {
  if (asArray) {
    // Initialize an empty array to hold the captured groups
    const fields: T[] = [];
    // Iterate over each regex in the record
    for (const key of Object.keys(regexes) as T[]) {
      // Get the regex for the current key
      const regex = regexes[key];
      if (regex.test(text)) {
        fields.push(key);
      }
    }
    // Return the array of captured groups
    return fields;
  } else {
    // Initialize an empty object to hold the captured groups
    const fields: { [K in T]?: boolean } = {};
    // Iterate over each regex in the record
    for (const key of Object.keys(regexes) as T[]) {
      // Get the regex for the current key
      const regex = regexes[key];
      if (regex.test(text)) {
        fields[key] = true;
      }
    }
    // Return the object of captured groups
    return fields;
  }
}
