/**
 * @brief File extension regular expression
 * @description Matches common file extensions in a case-insensitive manner.
 */
export const FILE_EXTENSION_EXP = /\.[a-z0-9]{2,4}$/i;

/**
 * @brief Simple title regular expression
 * @description Matches common video title formats.
 */
export const SIMPLE_TITLE_EXP =
  /\s*(?:480[ip]|576[ip]|720[ip]|1080[ip]|2160[ip]|HVEC|[xh][\W_]?26[45]|DD\W?5\W1|[<>?*:|]|848x480|1280x720|1920x1080)((8|10)b(it))?/i;

/**
 * @brief Website prefix regular expression
 * @description Matches common website prefixes in file names.
 */
export const WEBSITE_PREFIX_EXP = /^\[\s*[a-z]+(\.[a-z]+)+\s*\][- ]*|^www\.[a-z]+\.(?:com|net)[ -]*/i;

/**
 * @brief Clean torrent prefix regular expression
 * @description Matches common clean torrent prefixes in file names.
 */
export const CLEAN_TORRENT_PREFIX_EXP = /^\[(?:REQ)\]/i;

/**
 * @brief Clean torrent suffix regular expression
 * @description Matches common clean torrent suffixes in file names.
 */
export const CLEAN_TORRENT_SUFFIX_EXP = /\[(?:ettv|rartv|rarbg|cttv)\]$/i;

/**
 * @brief Common sources regular expression
 * @description Matches common video sources in file names.
 */
export const COMMON_SOURCES_EXP =
  /\b(Bluray|(dvdr?|BD)rip|HDTV|HDRip|TS|R5|CAM|SCR|(WEB|DVD)?.?SCREENER|DiVX|xvid|web-?dl)\b/i;

/**
 * @brief Request info regular expression
 * @description Matches common request info patterns in file names.
 */
export const REQUEST_INFO_EXP = /^(?:\[.+?\])+/;

/**
 * @brief Edition info regular expression
 * @description Matches common edition info patterns in file names.
 */
export const EDITION_EXP =
  /\b((Extended.|Ultimate.)?(Director.?s|Collector.?s|Theatrical|Anniversary|The.Uncut|DC|Ultimate|Final(?=(.(Cut|Edition|Version)))|Extended|Special|Despecialized|unrated|\d{2,3}(th)?.Anniversary)(.(Cut|Edition|Version))?(.(Extended|Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit))?|((Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit|Edition|Restored|((2|3|4)in1)))){1,3}/i;

/**
 * @brief Language info regular expression
 * @description Matches common language info patterns in file names.
 */
export const LANGUAGE_EXP = /\b(TRUE.?FRENCH|videomann|SUBFRENCH|PLDUB|MULTI)/i;

/**
 * @brief Scene garbage regular expression
 * @description Matches common scene garbage patterns in file names.
 */
export const SCENE_GARBAGE_EXP = /\b(PROPER|REAL|READ.NFO)/;

/**
 * @brief WEB-DL regular expression
 * @description Matches common WEB-DL patterns in file names.
 */
export const WEBDL_EXP =
  /\b(?<webdl>WEB[-_. ]DL|HDRIP|WEBDL|WEB-DLMux|NF|APTV|NETFLIX|NetflixU?HD|DSNY|DSNP|HMAX|AMZN|AmazonHD|iTunesHD|MaxdomeHD|WebHD\b|[. ]WEB[. ](?:[xh]26[45]|DD5[. ]1)|\d+0p[. ]WEB[. ]|\b\s\/\sWEB\s\/\s\b|AMZN[. ]WEB[. ])\b/i;

/**
 * @brief Provider info regular expression
 * @description Matches common provider info patterns in file names.
 */
export const PROVIDER_EXP = /\{(tmdb|imdb|tvdb)-[a-zA-Z0-9]+\}/g;

/**
 * @brief Multi-language info regular expression
 * @description Matches common multi-language info patterns in file names.
 */
export const MULTI_EXP = /(?<!(WEB-))\b(MULTi|DUAL|DL)\b/i;

/**
 * @brief Complete DVD info regular expression
 * @description Matches common complete DVD info patterns in file names.
 */
export const COMPLETE_DVD_EXP = /\b(NTSC|PAL)?.DVDR\b/i;

/**
 * @brief Complete info regular expression
 * @description Matches common complete info patterns in file names.
 */
export const COMPLETE_EXP = /\b(COMPLETE)\b/i;
