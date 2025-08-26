/**
 * @brief Regular expressions for matching audio codec names.
 * @description This object contains regular expressions for various audio codec names.
 */
export const AUDIO_CODECS_EXPS = {
  'mp3': /\b((LAME(?:\d)+-?(?:\d)+)|(mp3))\b/i,
  'mp2': /\b((mp2))\b/i,
  'dolby digital': /\b((Dolby)|(Dolby-?Digital)|(DD)|(AC3D?))\b/i,
  'dolby atmos': /\b((Dolby-?Atmos))\b/i,
  'aac': /\b((AAC))(\d?.?\d?)(ch)?\b/i,
  'dolby digital plus': /\b((EAC3|DDP|DD\+))\b/i,
  'flac': /\b((FLAC))\b/i,
  'dts': /\b((DTS))\b/i,
  'dts-hd': /\b((DTS-?HD)|(DTS(?=-?MA)|(DTS-X)))\b/i,
  'dolby trueHD': /\b((True-?HD))\b/i,
  'opus': /\b((Opus))\b/i,
  'vorbis': /\b((Vorbis))\b/i,
  'pcm': /\b((PCM))\b/i,
  'lpcm': /\b((LPCM))\b/i
};
