export * from './account';
export * from './options';
export * from './certification';
export * from './credits';
export * from './companies';
export * from './networks';
export * from './configuration';
export * from './changes';
export * from './movies';
export * from './search';
export * from './tv-shows';
export * from './watch-providers';
export * from './people';
export * from './discover';
export * from './review';
export * from './trending';
export * from './find';
export * from './keywords';
export * from './collections';
export * from './tv-episode';
export * from './tv-seasons';

export interface TMDBErrorResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export type TMDBMediaType = 'movie' | 'tv' | 'person';

export interface TMDBAuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating?: number;
}

export type TMDBKnownFor = TMDBMovieWithMediaType | TMDBTVWithMediaType;

export interface TMDBPerson {
  id: number;
  name: string;
  original_name: string;
  known_for: TMDBKnownFor[];
  profile_path: string;
  adult: boolean;
  known_for_department: string;
  gender: number;
  popularity: number;
}

export interface TMDBPersonWithMediaType extends TMDBPerson {
  media_type: 'person';
}

export interface TMDBMovie {
  id: number;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface TMDBMovieWithMediaType extends TMDBMovie {
  media_type: 'movie';
}

export interface TMDBCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TMDBTV {
  id: number;
  adult: boolean;
  name: string;
  first_air_date: string;
  backdrop_path: string;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export interface TMDBTVWithMediaType extends TMDBTV {
  media_type: 'tv';
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBExternalIds {
  imdb_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
  tvdb_id?: number;
  freebase_mid?: string;
  freebase_id?: string;
  tvrage_id?: number;
  wikidata_id: string;
  tiktok_id?: string;
  youtube_id?: string;
  id: number;
}

export interface TMDBProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TMDBProductionCountry {
  iso_3166_1: TMDBCountryCode;
  name: string;
}

export interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBContentRatings {
  results: TMDBContentRatingsResult[];
  id: number;
}

export interface TMDBContentRatingsResult {
  descriptor: unknown[];
  iso_3166_1: TMDBCountryCode;
  rating: string;
}

export interface TMDBRecommendation {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDBRecommendations {
  page: number;
  results: TMDBRecommendation[];
  total_pages: number;
  total_results: number;
}

export interface TMDBReview {
  author: string;
  author_details: TMDBAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface TMDBReviews {
  id: number;
  page: number;
  results: TMDBReview[];
  total_pages: number;
  total_results: number;
}

export interface TMDBTranslationData {
  title: string;
  overview: string;
  homepage: string;
}

export interface TMDBTranslation {
  iso_3166_1: TMDBCountryCode;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TMDBTranslationData;
}

export interface TMDBTranslations {
  id: number;
  translations: TMDBTranslation[];
}

export interface TMDBImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TMDBImages {
  id: number;
  backdrops: TMDBImage[];
  logos: TMDBImage[];
  posters: TMDBImage[];
}

export const TMDBCountryCodes = [
  'AE',
  'AR',
  'AT',
  'AU',
  'BE',
  'BG',
  'BO',
  'BR',
  'CA',
  'CH',
  'CL',
  'CO',
  'CR',
  'CV',
  'CZ',
  'DE',
  'DK',
  'EC',
  'EE',
  'EG',
  'ES',
  'FI',
  'FR',
  'GB',
  'GH',
  'GR',
  'GT',
  'HK',
  'HN',
  'HU',
  'ID',
  'IE',
  'IL',
  'IN',
  'IT',
  'JP',
  'LT',
  'LV',
  'MU',
  'MX',
  'MY',
  'MZ',
  'NL',
  'NO',
  'NZ',
  'PE',
  'PH',
  'PL',
  'PT',
  'PY',
  'RU',
  'SA',
  'SE',
  'SG',
  'SI',
  'SK',
  'TH',
  'TR',
  'TW',
  'UG',
  'US',
  'VE',
  'ZA'
] as const;

export type TMDBCountryCode = (typeof TMDBCountryCodes)[number];

export interface TMDBGenres {
  genres: Array<{ id: number; name: string }>;
}
