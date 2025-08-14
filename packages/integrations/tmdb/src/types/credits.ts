import { TMDBCountryCode, TMDBImage, TMDBPerson } from '.';

/**
 * @brief Credit season information
 * @description Represents season information within credit data for TV shows.
 */
export interface TMDBCreditSeason {
  air_date?: string;
  poster_path?: string;
  season_number?: number;
}

/**
 * @brief Media information in credits
 * @description Represents media (movie/TV show) information within credit data.
 */
export interface TMDBMedia {
  id?: number;
  name?: string;
  first_air_date?: string;
  vote_count?: number;
  overview?: string;
  vote_average?: number;
  backdrop_path?: string;
  genre_ids?: number[];
  media_type: string;
  adult: boolean;
  original_name?: string;
  origin_country?: string[];
  poster_path?: string;
  original_language?: string;
  popularity?: number;
  character?: string;
  episodes?: string[];
  seasons?: TMDBCreditSeason[];
}

/**
 * @brief Credit response information
 * @description Represents a complete credit response from TMDB API.
 */
export interface TMDBCreditResponse {
  credit_type?: string;
  department?: string;
  job?: string;
  media?: TMDBMedia;
  media_type?: string;
  id?: string;
  person?: TMDBPerson;
}

/**
 * @brief Alternative title information
 * @description Represents an alternative title for a movie or TV show.
 */
export interface TMDBTitle {
  iso_3166_1: TMDBCountryCode;
  title: string;
  type: string;
}

/**
 * @brief Alternative titles collection
 * @description Contains all alternative titles for a movie or TV show.
 */
export interface TMDBAlternativeTitles {
  id: number;
  titles: TMDBTitle[];
}

/**
 * @brief Cast member information
 * @description Represents a cast member in movie or TV show credits.
 */
export interface TMDBCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

/**
 * @brief Crew member information
 * @description Represents a crew member in movie or TV show credits.
 */
export interface TMDBCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

/**
 * @brief Credits information
 * @description Contains cast and crew information for a movie or TV show.
 */
export interface TMDBCredits {
  id: number;
  cast: TMDBCast[];
  crew: TMDBCrew[];
}

/**
 * @brief Image collection
 * @description Contains backdrop and poster images for a movie or TV show.
 */
export interface TMDBImageCollection {
  id: number;
  backdrops: TMDBImage[];
  posters: TMDBImage[];
}

/**
 * @brief Video information
 * @description Represents a video (trailer, teaser, etc.) for a movie or TV show.
 */
export interface TMDBVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: TMDBCountryCode;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

/**
 * @brief Videos collection
 * @description Contains all videos for a movie or TV show.
 */
export interface TMDBVideos {
  id: number;
  results: TMDBVideo[];
}

/**
 * @brief Aggregate credits information
 * @description Contains aggregate cast and crew information for TV shows across all seasons.
 */
export interface TMDBAggregateCredits {
  id: number;
  cast: TMDBAggregateCast[];
  crew: TMDBAggregateCrew[];
}

/**
 * @brief Cast role information
 * @description Represents a specific role played by a cast member.
 */
export interface TMDBCastRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

/**
 * @brief Aggregate cast member information
 * @description Represents a cast member with aggregated information across multiple episodes/seasons.
 */
export interface TMDBAggregateCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: TMDBCastRole[];
  total_episode_count: number;
  order: number;
}

/**
 * @brief Crew job information
 * @description Represents a specific job performed by a crew member.
 */
export interface TMDBCrewJob {
  credit_id: string;
  job: string;
  episode_count: number;
}

/**
 * @brief Aggregate crew member information
 * @description Represents a crew member with aggregated information across multiple episodes/seasons.
 */
export interface TMDBAggregateCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  jobs: TMDBCrewJob[];
  department: string;
  total_episode_count: number;
}
