import { TMDBCountryCode, TMDBImage, TMDBMovie, TMDBPerson, TMDBTV } from '.';

/**
 * @brief Base cast information
 * @description Common properties for cast members across different media types.
 */
interface TMDBCast {
  character: string;
  credit_id: string;
  vote_count: number;
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_language: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  overview: string;
}

/**
 * @brief Base crew information
 * @description Common properties for crew members across different media types.
 */
interface TMDBCrew {
  id: number;
  department: string;
  original_language: string;
  credit_id: string;
  overview: string;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: number[];
  job: string;
  vote_average: number;
}

/**
 * @brief Person's movie cast credit
 * @description Represents a person's acting role in a movie.
 */
export interface TMDBPersonMovieCast extends TMDBCast {
  release_date: string;
  video: boolean;
  adult: boolean;
  title: string;
  original_title: string;
}

/**
 * @brief Person's movie crew credit
 * @description Represents a person's crew role in a movie.
 */
export interface TMDBPersonMovieCrew extends TMDBCrew {
  original_title: string;
  video: boolean;
  title: string;
  adult: boolean;
  release_date: string;
}

/**
 * @brief Person's TV show crew credit
 * @description Represents a person's crew role in a TV show.
 */
export interface TMDBPersonTvShowCrew extends TMDBCrew {
  episode_count: number;
  origin_country: string[];
  original_name: string;
  name: string;
  first_air_date: string;
}

export interface TMDBPersonTvShowCast extends TMDBCast {
  original_name: string;
  name: string;
  episode_count: number;
  first_air_date: string;
  origin_country: string[];
}

export interface TMDBPersonMovieCredit {
  cast: TMDBPersonMovieCast[];
  crew: TMDBPersonMovieCrew[];
  id: number;
}

export interface TMDBPersonTvShowCredit {
  cast: TMDBPersonTvShowCast[];
  crew: TMDBPersonTvShowCrew[];
  id: number;
}

export interface TMDBPersonCombinedCredits {
  cast: (TMDBPersonMovieCast & TMDBPersonTvShowCast)[];
  crew: (TMDBPersonMovieCrew & TMDBPersonTvShowCrew)[];
  id: number;
}

export interface TMDBPersonDetails {
  birthday: string;
  known_for_department: string;
  deathday: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;
}

export type TMDBPersonChangeValue =
  | string
  | {
      profile: {
        file_path: string;
      };
    };

export interface TMDBPopularPeople {
  page: number;
  results: TMDBPerson[];
  total_results: number;
  total_pages: number;
}

export interface TMDBPeopleImages {
  id: number;
  profiles: TMDBImage[];
}

export interface TMDBTaggedImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
  image_type: string;
  media_type: string;
  media: TMDBMovie | TMDBTV;
}

export interface TMDBTaggedImages {
  page: number;
  results: TMDBTaggedImage[];
  total_results: number;
  total_pages: number;
}

export interface TMDBPersonTranslations {
  id: number;
  translations: {
    iso_3166_1: TMDBCountryCode;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
      biography: string;
    };
  };
}
