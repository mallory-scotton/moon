import {
  TMDBCountryCode,
  TMDBGenre,
  TMDBMovie,
  TMDBProductionCompany,
  TMDBProductionCountry,
  TMDBSpokenLanguage
} from '.';

/**
 * @brief Movie collection information
 * @description Represents a collection that a movie belongs to.
 */
export interface TMDBBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

/**
 * @brief Detailed movie information
 * @description Contains comprehensive details about a specific movie.
 */
export interface TMDBMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: TMDBBelongsToCollection;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * @brief Release date type enumeration
 * @description Defines the different types of movie releases.
 */
export enum TMDBReleaseDateType {
  'Premiere' = 1,
  'Theatrical (limited)',
  'Theatrical',
  'Digital',
  'Physical',
  'TV'
}

/**
 * @brief Movie release date information
 * @description Represents a specific release date for a movie.
 */
export interface TMDBReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  release_date: string;
  type: TMDBReleaseDateType;
  note: string;
}

/**
 * @brief Release date result by country
 * @description Contains release date information for a specific country.
 */
export interface TMDBReleaseDateResult {
  iso_3166_1: TMDBCountryCode;
  release_dates: TMDBReleaseDate[];
}

/**
 * @brief Movie release dates collection
 * @description Contains all release date information for a movie across different countries.
 */
export interface TMDBReleaseDates {
  id: number;
  results: TMDBReleaseDateResult[];
}

/**
 * @brief Similar movies response
 * @description Contains a paginated list of movies similar to a specific movie.
 */
export interface TMDBSimilarMovies {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

/**
 * @brief Movie list information
 * @description Represents a user-created list that contains movies.
 */
export interface TMDBMovieList {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string;
}

/**
 * @brief Movie lists collection
 * @description Contains paginated movie lists that a specific movie belongs to.
 */
export interface TMDBMovieLists {
  id: number;
  page: number;
  results: TMDBMovieList[];
  total_pages: number;
  total_results: number;
}

/**
 * @brief Latest movie information
 * @description Represents the most recently added movie to TMDB.
 */
export interface TMDBLatestMovie {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: TMDBBelongsToCollection;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * @brief Date range information
 * @description Represents a date range with minimum and maximum dates.
 */
export interface TMDBDates {
  maximum: string;
  minimum: string;
}

/**
 * @brief Movies playing now response
 * @description Contains paginated list of movies currently playing in theaters.
 */
export interface TMDBMoviesPlayingNow {
  page: number;
  results: TMDBMovie[];
  dates: TMDBDates;
  total_pages: number;
  total_results: number;
}

/**
 * @brief Popular movies response
 * @description Contains paginated list of popular movies.
 */
export interface TMDBPopularMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

/**
 * @brief Top rated movies response
 * @description Contains paginated list of top-rated movies.
 */
export interface TMDBTopRatedMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

/**
 * @brief Upcoming movies response
 * @description Contains paginated list of upcoming movies.
 */
export interface TMDBUpcomingMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

/**
 * @brief Movie change value type
 * @description Represents different types of values that can change in movie data.
 */
export type TMDBMovieChangeValue =
  | string
  | {
      person_id: number;
      character: string;
      order: number;
      cast_id: number;
      credit_id: string;
    }
  | unknown;
