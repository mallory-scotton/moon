/**
 * @brief Media change information
 * @description Contains the details of a media change
 */
export interface TMDBMediaChange {
  id: number;
  adult?: boolean;
}

/**
 * @brief Media changes information
 * @description Contains the details of media changes
 */
export interface TMDBMediaChanges {
  results: TMDBMediaChange[];
  page: number;
  total_pages: number;
  total_results: number;
}

/**
 * @brief Changes information
 * @description Contains the details of changes
 */
export interface TMDBChanges<T> {
  changes: TMDBChange<T>[];
}

/**
 * @brief Change information
 * @description Contains the details of a change
 */
export interface TMDBChange<T> {
  key: string;
  items: TMDBChangeItem<T>[];
}

/**
 * @brief Change item information
 * @description Contains the details of a change item
 */
export interface TMDBChangeItem<T> {
  id: string;
  action: string;
  time: string;
  value: T;
  iso_639_1: string;
  original_value: T;
}
