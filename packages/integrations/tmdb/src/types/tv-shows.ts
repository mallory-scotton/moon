import { TMDBGenre, TMDBProductionCompany, TMDBProductionCountry, TMDBSpokenLanguage, TMDBLanguageOption } from '.';

/**
 * @brief TV show creator information
 * @description Represents a person who created a TV show.
 */
export interface TMDBCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

/**
 * @brief Next episode to air information
 * @description Contains details about the next episode scheduled to air.
 */
export interface TMDBNextEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

/**
 * @brief Last episode to air information
 * @description Contains details about the most recently aired episode.
 */
export interface TMDBLastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

/**
 * @brief Network information
 * @description Represents a TV network or streaming service.
 */
export interface TMDBNetwork {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

/**
 * @brief Season information
 * @description Contains basic information about a TV show season.
 */
export interface TMDBSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

/**
 * @brief Detailed TV show information
 * @description Contains comprehensive details about a specific TV show.
 */
export interface TMDBTvShowDetails {
  backdrop_path: string;
  created_by: TMDBCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TMDBLastEpisodeToAir;
  name: string;
  next_episode_to_air?: TMDBNextEpisodeToAir;
  networks: TMDBNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  seasons: TMDBSeason[];
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBNetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TMDBEpisodeGroup {
  description: string;
  episode_count: number;
  group_count: number;
  id: string;
  name: string;
  network: TMDBNetwork;
  type: number;
}

export interface TMDBEpisodeGroups {
  results: TMDBEpisodeGroup[];
  id: number;
}

export interface TMDBScreenedTheatricallyResult {
  id: number;
  episode_number: number;
  season_number: number;
}

export interface TMDBScreenedTheatrically {
  id: number;
  results: TMDBScreenedTheatricallyResult[];
}

export interface TMDBSimilarTvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  origin_country: string[];
  poster_path: string;
  popularity: number;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBSimilarTvShows {
  page: number;
  results: TMDBSimilarTvShow[];
  total_pages: number;
  total_results: number;
}

export interface TMDBLatestTvShows {
  backdrop_path?: string;
  created_by: TMDBCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  networks: TMDBNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  production_companies: TMDBProductionCompany[];
  seasons: TMDBSeason[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBOnTheAirResult {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface TMDBOnTheAir {
  page: number;
  results: TMDBOnTheAirResult[];
  total_results: number;
  total_pages: number;
}

export interface TMDBAiringTodayResult {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface TMDBTvShowsAiringToday {
  page: number;
  results: TMDBAiringTodayResult[];
  total_results: number;
  total_pages: number;
}

export interface TMDBPopularTvShowResult {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface TMDBPopularTvShows {
  page: number;
  results: TMDBPopularTvShowResult[];
  total_results: number;
  total_pages: number;
}

export interface TMDBTopRatedTvShowResult {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface TMDBTopRatedTvShows {
  page: number;
  results: TMDBTopRatedTvShowResult[];
  total_results: number;
  total_pages: number;
}

export interface TMDBTvShowChangeValue {
  season_id: number;
  season_number: number;
}

export interface TMDBTvShowImageOptions extends TMDBLanguageOption {
  /**
   * a list of ISO-639-1 values to query
   */
  include_image_language?: string[];
}

export interface TMDBTvShowVideoOptions extends TMDBLanguageOption {
  /**
   * a list of ISO-639-1 values to query
   */
  include_video_language?: string[];
}
