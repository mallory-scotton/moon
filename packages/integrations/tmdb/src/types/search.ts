/** Dependencies */
import {
  TMDBMovieWithMediaType,
  TMDBPersonWithMediaType,
  TMDBTVWithMediaType,
  TMDBLanguageOption,
  TMDBPageOption,
  TMDBRegionOption
} from '.';

/**
 * @brief Search result information
 * @description Contains the details of a search result
 */
export interface TMDBSearch<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * @brief Multi search result information
 * @description Contains the details of a multi search result
 */
export type TMDBMultiSearchResult = TMDBMovieWithMediaType | TMDBTVWithMediaType | TMDBPersonWithMediaType;

/**
 * @brief Search options
 * @description Contains the details of search options
 */
export interface TMDBSearchOptions {
  query: string;
  page?: number;
}

/**
 * @brief Movie search options
 * @description Contains the details of movie search options
 */
export interface TMDBMovieSearchOptions
  extends TMDBSearchOptions,
    TMDBLanguageOption,
    TMDBPageOption,
    TMDBRegionOption {
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
}

/**
 * @brief Collection search options
 * @description Contains the details of collection search options
 */
export interface TMDBCollectionSearchOptions
  extends TMDBSearchOptions,
    TMDBLanguageOption,
    TMDBPageOption,
    TMDBRegionOption {
  include_adult?: boolean;
}

/**
 * @brief TV search options
 * @description Contains the details of TV search options
 */
export interface TMDBTvSearchOptions extends TMDBSearchOptions, TMDBLanguageOption, TMDBPageOption {
  include_adult?: boolean;
  year?: number;
  first_air_date_year?: number;
}

/**
 * @brief People search options
 * @description Contains the details of people search options
 */
export interface TMDBPeopleSearchOptions extends TMDBSearchOptions, TMDBLanguageOption, TMDBPageOption {
  include_adult?: boolean;
}

/**
 * @brief Multi search options
 * @description Contains the details of multi search options
 */
export interface TMDBMultiSearchOptions extends TMDBSearchOptions, TMDBLanguageOption, TMDBPageOption {
  include_adult?: boolean;
}
