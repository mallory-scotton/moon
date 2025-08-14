import { TMDBCountryCode } from '.';

/**
 * @brief Image configuration settings
 * @description Contains image URLs and available sizes for TMDB images.
 */
export interface TMDBImageConfiguration {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: TMDBBackdropSizes[];
  logo_sizes: TMDBLogoSizes[];
  poster_sizes: TMDBPosterSizes[];
  profile_sizes: TMDBProfileSizes[];
  still_sizes: TMDBStillSizes[];
}

/**
 * @brief TMDB API configuration
 * @description Contains configuration settings for the TMDB API.
 */
export interface TMDBConfiguration {
  images: TMDBImageConfiguration;
  change_keys: TMDBChangeKeys[];
}

/**
 * @brief Country configuration
 * @description Represents a country with its codes and names.
 */
export interface TMDBCountryConfiguration {
  iso_3166_1: TMDBCountryCode;
  english_name: string;
  native_name: string;
}

/**
 * @brief Language configuration
 * @description Represents a language with its code and names.
 */
export interface TMDBLanguageConfiguration {
  iso_639_1: string;
  english_name: string;
  name: string;
}

/**
 * @brief Job configuration
 * @description Represents a department and its available jobs.
 */
export interface TMDBJobConfiguration {
  department: string;
  jobs: string[];
}

/**
 * @brief Timezone configuration
 * @description Represents a country and its timezone zones.
 */
export interface TMDBTimezoneConfiguration {
  iso_3166_1: TMDBCountryCode;
  zones: string[];
}

/**
 * @brief Media size constants
 * @description Predefined image size constants for TMDB media.
 */
export const TMDBMediaSize = {
  W45: 'w45',
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W300: 'w300',
  W342: 'w342',
  W500: 'w500',
  W632: 'w632',
  W780: 'w780',
  W1280: 'w1280',
  ORIGINAL: 'original'
} as const;

export const TMDBBackdropSize = {
  W45: 'w45',
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W300: 'w300',
  W500: 'w500',
  W780: 'w780',
  W1280: 'w1280',
  ORIGINAL: 'original'
} as const;

type TMDBBackdropSizes = (typeof TMDBBackdropSize)[keyof typeof TMDBBackdropSize];

export const TMDBLogoSize = {
  W45: 'w45',
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W300: 'w300',
  W500: 'w500',
  ORIGINAL: 'original'
} as const;

type TMDBLogoSizes = (typeof TMDBLogoSize)[keyof typeof TMDBLogoSize];

export const TMDBPosterSize = {
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W300: 'w300',
  W342: 'w342',
  W500: 'w500',
  W780: 'w780',
  ORIGINAL: 'original'
} as const;

type TMDBPosterSizes = (typeof TMDBPosterSize)[keyof typeof TMDBPosterSize];

export const TMDBProfileSize = {
  W45: 'w45',
  W185: 'w185',
  W632: 'w632',
  ORIGINAL: 'original'
} as const;

type TMDBProfileSizes = (typeof TMDBProfileSize)[keyof typeof TMDBProfileSize];

export const TMDBStillSize = {
  W92: 'w92',
  W185: 'w185',
  W300: 'w300',
  ORIGINAL: 'original'
} as const;

type TMDBStillSizes = (typeof TMDBStillSize)[keyof typeof TMDBStillSize];

export const TMDBChangeKey = {
  ADULT: 'adult',
  AIR_DATE: 'air_date',
  ALSO_KNOWN_AS: 'also_known_as',
  ALTERNATIVE_TITLES: 'alternative_titles',
  BIOGRAPHY: 'biography',
  BIRTHDAY: 'birthday',
  BUDGET: 'budget',
  CAST: 'cast',
  CERTIFICATIONS: 'certifications',
  CHARACTER_NAMES: 'character_names',
  CREATED_BY: 'created_by',
  CREW: 'crew',
  DEATHDAY: 'deathday',
  EPISODE: 'episode',
  EPISODE_NUMBER: 'episode_number',
  EPISODE_RUN_TIME: 'episode_run_time',
  FREEBASE_ID: 'freebase_id',
  FREEBASE_MID: 'freebase_mid',
  GENERAL: 'general',
  GENRES: 'genres',
  GUEST_STARS: 'guest_stars',
  HOMEPAGE: 'homepage',
  IMAGES: 'images',
  IMDB_ID: 'imdb_id',
  LANGUAGES: 'languages',
  NAME: 'name',
  NETWORK: 'network',
  ORIGIN_COUNTRY: 'origin_country',
  ORIGINAL_NAME: 'original_name',
  ORIGINAL_TITLE: 'original_title',
  OVERVIEW: 'overview',
  PARTS: 'parts',
  PLACE_OF_BIRTH: 'place_of_birth',
  PLOT_KEYWORDS: 'plot_keywords',
  PRODUCTION_CODE: 'production_code',
  PRODUCTION_COMPANIES: 'production_companies',
  PRODUCTION_COUNTRIES: 'production_countries',
  RELEASES: 'releases',
  REVENUE: 'revenue',
  RUNTIME: 'runtime',
  SEASON: 'season',
  SEASON_NUMBER: 'season_number',
  SEASON_REGULAR: 'season_regular',
  SPOKEN_LANGUAGES: 'spoken_languages',
  STATUS: 'status',
  TAGLINE: 'tagline',
  TITLE: 'title',
  TRANSLATIONS: 'translations',
  TVDB_ID: 'tvdb_id',
  TVRAGE_ID: 'tvrage_id',
  TYPE: 'type',
  VIDEO: 'video',
  VIDEOS: 'videos'
} as const;

type TMDBChangeKeys = (typeof TMDBChangeKey)[keyof typeof TMDBChangeKey];
