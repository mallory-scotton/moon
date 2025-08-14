/** Dependencies */
import { TMDBEpisode, TMDBMediaType, TMDBMovie, TMDBPerson, TMDBSeason, TMDBTV } from '.';

/**
 * @brief External source information
 * @description Contains the details of an external source
 */
export type TMDBExternalSource =
  | 'imdb_id'
  | 'freebase_mid'
  | 'freebase_id'
  | 'tvdb_id'
  | 'tvrage_id'
  | 'facebook_id'
  | 'twitter_id'
  | 'instagram_id';

/**
 * @brief External ID options
 * @description Contains the details of external ID options
 */
export interface TMDBExternalIdOptions {
  external_source: TMDBExternalSource;
  language?: string;
}

/**
 * @brief Media tagged information
 * @description Contains the details of media tagged information
 */
type TMDBMediaTagged<T> = T & {
  media_type: TMDBMediaType;
};

/**
 * @brief Find result information
 * @description Contains the details of a find result
 */
export interface TMDBFindResult {
  movie_results: TMDBMediaTagged<TMDBMovie>[];
  person_results: TMDBMediaTagged<TMDBPerson>[];
  tv_results: TMDBMediaTagged<TMDBTV>[];
  tv_episode_results: TMDBMediaTagged<TMDBEpisode>[];
  tv_season_results: TMDBMediaTagged<TMDBSeason & { show_id: string }>[];
}
