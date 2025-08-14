/** Dependencies */
import {
  TMDBMovie,
  TMDBPerson,
  TMDBTV,
  TMDBMediaType,
  TMDBMovieWithMediaType,
  TMDBTVWithMediaType,
  TMDBPersonWithMediaType
} from '.';

/**
 * @brief Time window
 * @description Contains the details of a time window
 */
export type TMDBTimeWindow = 'day' | 'week';

/**
 * @brief Trending media type
 * @description Contains the details of a trending media type
 */
export type TMDBTrendingMediaType = TMDBMediaType | 'all';

/**
 * @brief Trending result
 * @description Contains the details of a trending result
 */
type TMDBTrendingResult<T extends TMDBTrendingMediaType> = T extends 'tv'
  ? TMDBTV
  : T extends 'movie'
    ? TMDBMovie
    : T extends 'person'
      ? TMDBPerson
      : TMDBTVWithMediaType | TMDBMovieWithMediaType | TMDBPersonWithMediaType;

/**
 * @brief Trending results
 * @description Contains the details of trending results
 */
export interface TMDBTrendingResults<T extends TMDBTrendingMediaType> {
  page: number;
  results: TMDBTrendingResult<T>[];
  total_pages: number;
  total_results: number;
}
