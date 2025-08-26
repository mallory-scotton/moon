/** Dependencies */
import { FilterFalsy } from '../types';

/**
 * @brief Filters out empty values from an object type.
 * @description This utility function constructs a new object by picking only the properties from the original object that have non-empty values.
 * @param obj The original object to filter.
 * @returns A new object with only the non-empty properties.
 */
export function filterEmpty<T extends object>(obj: T): FilterFalsy<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v)) as FilterFalsy<T>;
}
