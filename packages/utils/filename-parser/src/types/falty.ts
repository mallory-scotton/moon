/**
 * @brief Filters out falsy values from an object type.
 * @description This utility type constructs a new object type by picking only the properties from the original object type 'T' that have truthy values.
 */
export type FilterFalsy<T extends object> = {
  [K in keyof T as T[K] extends null | undefined | false | 0 | '' ? never : K]: T[K];
};
