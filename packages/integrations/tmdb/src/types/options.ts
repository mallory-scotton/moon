import {
  TMDBAlternativeTitles,
  TMDBChanges,
  TMDBContentRatings,
  TMDBCredits,
  TMDBEpisodeGroups,
  TMDBExternalIds,
  TMDBImages,
  TMDBKeywords,
  TMDBMovieLists,
  TMDBPeopleImages,
  TMDBPersonTranslations,
  TMDBPersonCombinedCredits,
  TMDBPersonMovieCredit,
  TMDBPersonTvShowCredit,
  TMDBRecommendations,
  TMDBReleaseDates,
  TMDBReviews,
  TMDBScreenedTheatrically,
  TMDBSimilarMovies,
  TMDBSimilarTvShows,
  TMDBTaggedImages,
  TMDBTranslations,
  TMDBVideos,
  TMDBWatchProviders,
  TMDBPersonChangeValue,
  TMDBMovieChangeValue,
  TMDBTvShowChangeValue,
  TMDBTvEpisodeChangeValue,
  TMDBTvEpisodeCredit,
  TMDBTvEpisodeTranslations,
  TMDBTvSeasonChangeValue,
  TMDBCountryCode
} from '.';

/**
 * @brief Available languages for TMDB API
 * @description List of all supported language codes for TMDB API requests.
 */
export const TMDBAvailableLanguages = [
  'af-ZA',
  'ar-AE',
  'ar-BH',
  'ar-EG',
  'ar-IQ',
  'ar-JO',
  'ar-LY',
  'ar-MA',
  'ar-QA',
  'ar-SA',
  'ar-TD',
  'ar-YE',
  'be-BY',
  'bg-BG',
  'bn-BD',
  'br-FR',
  'ca-AD',
  'ca-ES',
  'ch-GU',
  'cs-CZ',
  'cy-GB',
  'da-DK',
  'de-AT',
  'de-CH',
  'de-DE',
  'el-CY',
  'el-GR',
  'en-AG',
  'en-AU',
  'en-BB',
  'en-BZ',
  'en-CA',
  'en-CM',
  'en-GB',
  'en-GG',
  'en-GH',
  'en-GI',
  'en-GY',
  'en-IE',
  'en-JM',
  'en-KE',
  'en-LC',
  'en-MW',
  'en-NZ',
  'en-PG',
  'en-TC',
  'en-US',
  'en-ZM',
  'en-ZW',
  'eo-EO',
  'es-AR',
  'es-CL',
  'es-DO',
  'es-EC',
  'es-ES',
  'es-GQ',
  'es-GT',
  'es-HN',
  'es-MX',
  'es-NI',
  'es-PA',
  'es-PE',
  'es-PY',
  'es-SV',
  'es-UY',
  'et-EE',
  'eu-ES',
  'fa-IR',
  'fi-FI',
  'fr-BF',
  'fr-CA',
  'fr-CD',
  'fr-CI',
  'fr-FR',
  'fr-GF',
  'fr-GP',
  'fr-MC',
  'fr-ML',
  'fr-MU',
  'fr-PF',
  'ga-IE',
  'gd-GB',
  'gl-ES',
  'he-IL',
  'hi-IN',
  'hr-HR',
  'hu-HU',
  'id-ID',
  'it-IT',
  'it-VA',
  'ja-JP',
  'ka-GE',
  'kk-KZ',
  'kn-IN',
  'ko-KR',
  'ky-KG',
  'lt-LT',
  'lv-LV',
  'ml-IN',
  'mr-IN',
  'ms-MY',
  'ms-SG',
  'nb-NO',
  'nl-BE',
  'nl-NL',
  'no-NO',
  'pa-IN',
  'pl-PL',
  'pt-AO',
  'pt-BR',
  'pt-MZ',
  'pt-PT',
  'ro-MD',
  'ro-RO',
  'ru-RU',
  'si-LK',
  'sk-SK',
  'sl-SI',
  'sq-AL',
  'sq-XK',
  'sr-ME',
  'sr-RS',
  'sv-SE',
  'sw-TZ',
  'ta-IN',
  'te-IN',
  'th-TH',
  'tl-PH',
  'tr-TR',
  'uk-UA',
  'ur-PK',
  'vi-VN',
  'zh-CN',
  'zh-HK',
  'zh-SG',
  'zh-TW',
  'zu-ZA'
] as const;

/**
 * @brief Available language type
 * @description Union type of all available TMDB language codes.
 */
export type TMDBAvailableLanguage = (typeof TMDBAvailableLanguages)[number];

/**
 * @brief Language option interface
 * @description Interface for specifying language in API requests.
 */
export interface TMDBLanguageOption {
  language?: TMDBAvailableLanguage;
}

/**
 * @brief Watch region option interface
 * @description Interface for specifying watch region in API requests.
 */
export interface TMDBWatchRegionOption {
  watch_region?: TMDBCountryCode;
}

/**
 * @brief Region option interface
 * @description Interface for specifying region in API requests.
 */
export interface TMDBRegionOption {
  region?: string;
}

/**
 * @brief Timezone option interface
 * @description Interface for specifying timezone in API requests.
 */
export interface TMDBTimezoneOption {
  timezone?: string;
}

/**
 * @brief Page option interface
 * @description Interface for specifying page number in paginated API requests.
 */
export interface TMDBPageOption {
  page?: number;
}

/**
 * @brief Change option interface
 * @description Interface for specifying change tracking options with date range.
 */
export interface TMDBChangeOption extends TMDBPageOption {
  start_date?: string;
  end_date?: string;
}

/**
 * @brief Movie append-to-response keys
 * @description Valid keys for appending additional data to movie requests.
 */
export type TMDBAppendToResponseMovieKey =
  | 'images'
  | 'videos'
  | 'credits'
  | 'recommendations'
  | 'reviews'
  | 'changes'
  | 'similar'
  | 'lists'
  | 'release_dates'
  | 'alternative_titles'
  | 'external_ids'
  | 'translations'
  | 'watch/providers'
  | 'keywords';

export type TMDBAppendToResponseTvKey =
  | 'content_ratings'
  | 'images'
  | 'videos'
  | 'credits'
  | 'recommendations'
  | 'reviews'
  | 'changes'
  | 'similar'
  | 'alternative_titles'
  | 'external_ids'
  | 'translations'
  | 'watch/providers'
  | 'aggregate_credits'
  | 'episode_groups'
  | 'screened_theatrically'
  | 'keywords';

export type TMDBAppendToResponsePersonKey =
  | 'images'
  | 'changes'
  | 'movie_credits'
  | 'tv_credits'
  | 'combined_credits'
  | 'external_ids'
  | 'tagged_images'
  | 'translations';

export type TMDBAppendToResponseTvEpisodeKey = 'images' | 'credits' | 'external_ids' | 'videos' | 'translations';

export type TMDBAppendToResponseTvSeasonKey =
  | 'images'
  | 'credits'
  | 'external_ids'
  | 'videos'
  | 'aggregate_credits'
  | 'translations';

type TMDBAppendToResponseAllKeys =
  | TMDBAppendToResponseTvKey
  | TMDBAppendToResponseMovieKey
  | TMDBAppendToResponseTvEpisodeKey
  | TMDBAppendToResponseTvSeasonKey
  | TMDBAppendToResponsePersonKey;

export type TMDBAppendToResponseMediaType = 'movie' | 'tvShow' | 'person' | 'tvSeason' | 'tvEpisode';

export type TMDBAppendToResponse<
  K,
  T extends TMDBAppendToResponseAllKeys[] | undefined,
  Media extends TMDBAppendToResponseMediaType
> = K &
  (T extends undefined
    ? object
    : T extends Array<unknown>
      ? ('credits' extends T[number]
          ? {
              credits: Media extends 'tvEpisode' ? TMDBTvEpisodeCredit : Omit<TMDBCredits, 'id'>;
            }
          : object) &
          ('videos' extends T[number] ? { videos: Omit<TMDBVideos, 'id'> } : object) &
          ('images' extends T[number]
            ? {
                images: Omit<Media extends 'person' ? TMDBPeopleImages : TMDBImages, 'id'>;
              }
            : object) &
          ('recommendations' extends T[number] ? { recommendations: TMDBRecommendations } : object) &
          ('reviews' extends T[number] ? { reviews: Omit<TMDBReviews, 'id'> } : object) &
          ('reviews' extends T[number] ? { reviews: Omit<TMDBTranslations, 'id'> } : object) &
          ('changes' extends T[number]
            ? {
                changes: TMDBChanges<
                  Media extends 'person'
                    ? TMDBPersonChangeValue
                    : Media extends 'movie'
                      ? TMDBMovieChangeValue
                      : Media extends 'tvShow'
                        ? TMDBTvShowChangeValue
                        : Media extends 'tvSeason'
                          ? TMDBTvSeasonChangeValue
                          : TMDBTvEpisodeChangeValue
                >;
              }
            : object) &
          ('keywords' extends T[number] ? { keywords: Omit<TMDBKeywords, 'id'> } : object) &
          ('lists' extends T[number] ? { lists: Omit<TMDBMovieLists, 'id'> } : object) &
          ('release_dates' extends T[number] ? { release_dates: Omit<TMDBReleaseDates, 'id'> } : object) &
          ('alternative_titles' extends T[number]
            ? { alternative_titles: Omit<TMDBAlternativeTitles, 'id'> }
            : object) &
          ('external_ids' extends T[number] ? { external_ids: Omit<TMDBExternalIds, 'id'> } : object) &
          ('translations' extends T[number]
            ? {
                translations: Omit<
                  Media extends 'person'
                    ? TMDBPersonTranslations
                    : Media extends 'tvEpisode'
                      ? TMDBTvEpisodeTranslations
                      : TMDBTranslations,
                  'id'
                >;
              }
            : object) &
          ('watch/providers' extends T[number] ? { 'watch/providers': Omit<TMDBWatchProviders, 'id'> } : object) &
          ('aggregate_credits' extends T[number] ? { aggregate_credits: Omit<TMDBCredits, 'id'> } : object) &
          ('episode_groups' extends T[number] ? { episode_groups: Omit<TMDBEpisodeGroups, 'id'> } : object) &
          ('screened_theatrically' extends T[number]
            ? { screened_theatrically: Omit<TMDBScreenedTheatrically, 'id'> }
            : object) &
          ('similar' extends T[number]
            ? {
                similar: Media extends 'movie'
                  ? TMDBSimilarMovies
                  : Media extends 'tvShow'
                    ? TMDBSimilarTvShows
                    : unknown;
              }
            : object) &
          ('content_ratings' extends T[number] ? { content_ratings: Omit<TMDBContentRatings, 'id'> } : object) &
          ('movie_credits' extends T[number] ? { movie_credits: Omit<TMDBPersonMovieCredit, 'id'> } : object) &
          ('tv_credits' extends T[number] ? { tv_credits: Omit<TMDBPersonTvShowCredit, 'id'> } : object) &
          ('combined_credits' extends T[number]
            ? { combined_credits: Omit<TMDBPersonCombinedCredits, 'id'> }
            : object) &
          ('tagged_images' extends T[number] ? { tagged_images: TMDBTaggedImages } : object)
      : never);

export type TMDBProviderOptions = TMDBWatchRegionOption & TMDBLanguageOption;

export interface TMDBMoviesImageSearchOptions extends TMDBLanguageOption {
  include_image_language?: string[];
}

export interface TMDBTvEpisodeImageSearchOptions extends TMDBLanguageOption {
  include_image_language?: string[];
}

export interface TMDBTvEpisodeVideoSearchOptions extends TMDBLanguageOption {
  include_video_language?: string[];
}

export interface TMDBTvSeasonImageSearchOptions extends TMDBLanguageOption {
  include_image_language?: string[];
}

export interface TMDBTvSeasonVideoSearchOptions extends TMDBLanguageOption {
  include_video_language?: string[];
}
