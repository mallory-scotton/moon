/**
 * @brief Clean release group regular expression
 * @description Matches common clean release group patterns in file names.
 */
export const CLEAN_RELEASE_GROUP_EXP =
  /(-(RP|1|NZBGeek|Obfuscated|Obfuscation|Scrambled|sample|Pre|postbot|xpost|Rakuv[a-z0-9]*|WhiteRev|BUYMORE|AsRequested|AlternativeToRequested|GEROV|Z0iDS3N|Chamele0n|4P|4Planet|AlteZachen|RePACKPOST))+$/i;

/**
 * @brief Release group regular expression
 * @description Matches common release group patterns in file names.
 */
export const RELEASE_GROUP_EXP =
  /-(?<releasegroup>[a-z0-9]+)(?<!WEB-DL|WEB-RIP|480p|720p|1080p|2160p|DTS-(HD|X|MA|ES)|([a-zA-Z]{3}-ENG))(?:\b|[-._ ])/i;

/**
 * @brief Anime release group regular expression
 * @description Matches common anime release group patterns in file names.
 */
export const ANIME_RELEASE_GROUP_EXP = /^(?:\[(?<subgroup>(?!\s).+?(?<!\s))\](?:_|-|\s|\.)?)/i;

/**
 * @brief Exception release group regular expression
 * @description Matches common exception release group patterns in file names.
 */
export const EXCEPTION_RELEASE_GROUP_EXP =
  /(\[)?(?<releasegroup>(Joy|YIFY|YTS.(MX|LT|AG)|FreetheFish|VH-PROD|FTW-HS|DX-TV|Blu-bits|afm72|Anna|Bandi|Ghost|Kappa|MONOLITH|Qman|RZeroX|SAMPA|Silence|theincognito|D-Z0N3|t3nzin|Vyndros|HDO|DusIctv|DHD|SEV|CtrlHD|-ZR-|ADC|XZVN|RH|Kametsu|r00t|HONE))(\])?$/i;
