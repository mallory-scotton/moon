/**
 * @brief Source regular expressions
 * @description Matches common video source patterns in file names.
 */
export const SOURCE_EXPS = {
  bluray: /\b(?<bluray>M?Blu-?Ray|HDDVD|BD|UHDBD|BDISO|BDMux|BD25|BD50|BR.?DISK|Bluray(1080|720)p?|BD(1080|720)p?)\b/i,
  webdl:
    /\b(?<webdl>WEB[-_. ]DL|HDRIP|WEBDL|WEB-DLMux|NF|APTV|NETFLIX|NetflixU?HD|DSNY|DSNP|HMAX|AMZN|AmazonHD|iTunesHD|MaxdomeHD|WebHD\b|[. ]WEB[. ](?:[xh]26[45]|DD5[. ]1)|\d+0p[. ]WEB[. ]|\b\s\/\sWEB\s\/\s\b|AMZN[. ]WEB[. ])\b/i,
  webrip: /\b(?<webrip>WebRip|Web-Rip|WEBCap|WEBMux)\b/i,
  hdtv: /\b(?<hdtv>HDTV)\b/i,
  bdrip: /\b(?<bdrip>BDRip)\b/i,
  brrip: /\b(?<brrip>BRRip)\b/i,
  dvdr: /\b(?<dvdr>DVD-R|DVDR)\b/i,
  dvd: /\b(?<dvd>DVD9?|DVDRip|NTSC|PAL|xvidvd|DvDivX)\b/i,
  dsr: /\b(?<dsr>WS[-_. ]DSR|DSR)\b/i,
  regional: /\b(?<regional>R[0-9]{1}|REGIONAL)\b/i,
  ppv: /\b(?<ppv>PPV)\b/i,
  scr: /\b(?<scr>SCR|SCREENER|DVDSCR|(DVD|WEB).?SCREENER)\b/i,
  ts: /\b(?<ts>TS|TELESYNC|HD-TS|HDTS|PDVD|TSRip|HDTSRip)\b/i,
  tc: /\b(?<tc>TC|TELECINE|HD-TC|HDTC)\b/i,
  cam: /\b(?<cam>CAMRIP|CAM|HDCAM|HD-CAM)\b/i,
  workprint: /\b(?<workprint>WORKPRINT|WP)\b/i,
  pdtv: /\b(?<pdtv>PDTV)\b/i,
  sdtv: /\b(?<sdtv>SDTV)\b/i,
  tvrip: /\b(?<tvrip>TVRip)\b/i
};
