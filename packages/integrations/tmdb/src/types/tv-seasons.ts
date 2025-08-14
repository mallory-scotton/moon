/** Dependencies */
import { TMDBEpisode } from '.';

/**
 * @brief Season selection
 * @description Contains the details of a season selection
 */
export interface TMDBSeasonSelection {
  tvShowID: number;
  seasonNumber: number;
}

/**
 * @brief Season details
 * @description Contains the details of a season
 */
export interface TMDBSeasonDetails {
  air_date: string;
  episodes: TMDBEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
}

/**
 * @brief TV season change value
 * @description Contains the details of a TV season change value
 */
export type TMDBTvSeasonChangeValue =
  | string
  | {
      episode_id: number;
      episode_number: number;
    };
