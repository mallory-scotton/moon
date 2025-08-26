/**
 * @brief Resolution regular expressions
 * @description Matches common video resolution formats.
 */
export const RESOLUTION_EXPS = {
  '2160p': /(2160p|4k[-_. ](?:UHD|HEVC|BD)|(?:UHD|HEVC|BD)[-_. ]4k|\b(4k)\b|COMPLETE.UHD|UHD.COMPLETE)/i,
  '1080p': /(1080(i|p)|1920x1080)(10bit)?/i,
  '720p': /(720(i|p)|1280x720|960p)(10bit)?/i,
  '576p': /(576(i|p))/i,
  '540p': /(540(i|p))/i,
  '480p': /(480(i|p)|640x480|848x480)/i
};
