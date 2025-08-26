/** Dependencies */
import { MULTI_EXP } from './utils';

/**
 * @brief Language regular expressions
 * @description Contains regular expressions for matching various language identifiers in file names.
 */
export const LANGUAGE_EXPS = {
  english: /(?:(?<!WEB-)\b(MULTi|DUAL|DL)\b|\b(english|eng|en|fi)\b)/i,
  french: /\b(fr|french|vostfr|vo|vff|vfq|vf2|truefrench|subfrench)\b/i,
  spanish: /\b(spanish)\b/i,
  german: /\b(german|videomann)\b/i,
  italian: /\b(ita|italian)\b/i,
  danish: /\b(dk|dan|danish)\b/i,
  dutch: /\b(nl|dutch)\b/i,
  japanese: /\b(japanese)\b/i,
  cantonese: /\b(cantonese)\b/i,
  mandarin: /\b(mandarin)\b/i,
  russian: /\b(russian|rus)\b/i,
  polish: /\b(polish|pl|pldub)\b/i,
  vietnamese: /\b(vietnamese)\b/i,
  nordic: /\b(nordic|nordicsubs)\b/i,
  swedish: /\b(swedish|se|swe)\b/i,
  norwegian: /\b(norwegian|no)\b/i,
  finnish: /\b(finnish)\b/i,
  turkish: /\b(turkish)\b/i,
  portuguese: /\b(portuguese)\b/i,
  flemish: /\b(flemish)\b/i,
  greek: /\b(greek)\b/i,
  korean: /\b(korean)\b/i,
  hungarian: /\b(hungarian|hundub|hun)\b/i,
  persian: /\b(persian)\b/i,
  bengali: /\b(bengali)\b/i,
  bulgarian: /\b(bulgarian)\b/i,
  brazilian: /\b(brazilian)\b/i,
  hebrew: /\b(hebrew|HebDub)\b/i,
  czech: /\b(czech|CZ|SK)\b/i,
  ukrainian: /\b(ukrainian|ukr)\b/i,
  catalan: /\b(catalan)\b/i,
  chinese: /\b(chinese|chi)\b/i,
  thai: /\b(thai)\b/i,
  hindi: /\b(hindi|hin)\b/i,
  tamil: /\b(tamil|tam)\b/i,
  arabic: /\b(arabic)\b/i,
  estonian: /\b(estonian)\b/i,
  icelandic: /\b(icelandic|ice)\b/i,
  latvian: /\b(latvian)\b/i,
  lithuanian: /\b(lithuanian)\b/i,
  romanian: /\b(ro|romanian|rodubbed)\b/i,
  slovak: /\b(slovak|sk)\b/i,
  serbian: /\b(serbian)\b/i,
  multi: MULTI_EXP
};
