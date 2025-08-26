/**
 * @brief Video codec regular expressions
 * @description Matches common video codec formats.
 */
export const VIDEO_CODEC_EXPS = {
  h264: /(h264)/i,
  h265: /(h265)/i,
  x265: /(x265)/i,
  hevc: /(HEVC)/i,
  x264: /(x264)/i,
  xvidhd: /(XvidHD)/i,
  xvid: /(X-?vid)/i,
  divx: /(divx)/i,
  wmv: /(WMV)/i,
  dvdr: /\b(DVD-R|DVDR)\b/i
};
