/**
 * @brief Video codec regular expressions
 * @description Matches common video codec formats.
 */
export const VIDEO_CODEC_EXPS = {
  x265: /(x265)/i,
  h265: /(h265)/i,
  x264: /(x264)/i,
  h264: /(h264)/i,
  wmv: /(WMV)/i,
  xvidhd: /(XvidHD)/i,
  xvid: /(X-?vid)/i,
  divx: /(divx)/i,
  hevc: /(HEVC)/i,
  dvdr: /\b(DVD-R|DVDR)\b/i
};
