import { TMDBCountryCode, TMDBCredits, TMDBCrew } from '.';

export interface TMDBEpisodeSelection {
  tvShowID: number;
  seasonNumber: number;
  episodeNumber: number;
}

export interface TMDBEpisode {
  air_date: string;
  episode_number: number;
  crew: TMDBCrew[];
  guest_stars: TMDBGuestStar[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  show_id: number;
}

export interface TMDBGuestStar {
  credit_id: string;
  order: number;
  character: string;
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface TMDBTvEpisodeCredit extends TMDBCredits {
  guest_stars: TMDBGuestStar[];
}

export interface TMDBTvEpisodeTranslations {
  id: number;
  translations: {
    iso_3166_1: TMDBCountryCode;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
      name: string;
      overview: string;
    };
  };
}

export type TMDBTvEpisodeChangeValue = string | unknown;
