/** Dependencies */
import {
  AUDIO_CHANNELS_EXPS,
  AUDIO_CODEC_EXPS,
  EDITION_EXPS,
  LANGUAGE_EXPS,
  VIDEO_CODEC_EXPS,
  RESOLUTION_EXPS,
  SOURCE_EXPS
} from '../rules';

/**
 * @brief Audio codec used in the media file
 * @description The audio codec used in the media file
 */
export type AudioCodec = keyof typeof AUDIO_CODEC_EXPS;

/**
 * @brief Audio channels used in the media file
 * @description The audio channels used in the media file
 */
export type AudioChannels = keyof typeof AUDIO_CHANNELS_EXPS;

/**
 * @brief  Resolution of the media file
 * @description The resolution of the media file
 */
export type Resolution = keyof typeof RESOLUTION_EXPS;

/**
 * @brief Video codec used in the media file
 * @description The video codec used in the media file
 */
export type VideoCodec = keyof typeof VIDEO_CODEC_EXPS;

/**
 * @brief Language used in the media file
 * @description The language used in the media file
 */
export type Language = keyof typeof LANGUAGE_EXPS;

/**
 * @brief Edition type of the media file
 * @description The edition type of the media file
 */
export type EditionType = keyof typeof EDITION_EXPS;

/**
 * @brief Edition information of the media file
 * @description The edition information of the media file
 */
export type Edition = {
  [key in EditionType]?: boolean;
};

/**
 * @brief Source type of the media file
 * @description The source type of the media file
 */
export type SourceType = keyof typeof SOURCE_EXPS;

/**
 * @brief Source information of the media file
 * @description The source information of the media file
 */
export type Source = {
  [key in SourceType]?: boolean;
};

/**
 * @brief Provider type of the media file
 * @description The provider type of the media file
 */
export type ProviderType = 'tmdb' | 'imdb' | 'tvdb';

/**
 * @brief Provider information of the media file
 * @description The provider information of the media file
 */
export type Provider = {
  name: ProviderType;
  id: string;
};

/**
 * @brief Filename parsing result
 * @description The result of parsing a filename
 */
export interface BaseFilenameParseResult {
  audioCodec?: AudioCodec;
  audioChannels?: AudioChannels;
  resolution?: Resolution;
  videoCodec?: VideoCodec;
  edition?: Edition;
  sources?: Source;
  provider?: Provider;
  complete?: boolean;
  title?: string;
  year?: number;
  part?: number;
  languages?: Language[];
}

/**
 * @brief TV show filename parsing result
 * @description The result of parsing a TV show filename
 */
export interface TvFilenameParseResult extends BaseFilenameParseResult {
  seasons?: number[];
  episodeNumbers?: number[];
  airDate?: Date | null;
  fullSeason?: boolean;
  isPartialSeason?: boolean;
  isMultiSeason?: boolean;
  isSeasonExtra?: boolean;
  isSpecial?: boolean;
  seasonPart?: number;
}

/**
 * @brief The result of parsing a filename
 * @description The result of parsing a filename
 */
export type FilenameParseResult = BaseFilenameParseResult | TvFilenameParseResult;
