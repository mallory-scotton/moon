/**
 * @brief Convert seconds to milliseconds
 * @description Converts the given time in seconds to milliseconds.
 * @param seconds The time in seconds.
 * @returns The time in milliseconds.
 */
export function seconds(seconds: number) {
  return seconds * 1000;
}

/**
 * @brief Convert minutes to milliseconds
 * @description Converts the given time in minutes to milliseconds.
 * @param minutes The time in minutes.
 * @returns The time in milliseconds.
 */
export function minutes(minutes: number) {
  return minutes * 60 * 1000;
}

/**
 * @brief Convert hours to milliseconds
 * @description Converts the given time in hours to milliseconds.
 * @param hours The time in hours.
 * @returns The time in milliseconds.
 */
export function hours(hours: number) {
  return hours * 60 * 60 * 1000;
}

/**
 * @brief Convert days to milliseconds
 * @description Converts the given time in days to milliseconds.
 * @param days The time in days.
 * @returns The time in milliseconds.
 */
export function days(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

/**
 * @brief Convert weeks to milliseconds
 * @description Converts the given time in weeks to milliseconds.
 * @param weeks The time in weeks.
 * @returns The time in milliseconds.
 */
export function weeks(weeks: number) {
  return weeks * 7 * 24 * 60 * 60 * 1000;
}
