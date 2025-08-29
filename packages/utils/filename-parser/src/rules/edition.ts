/**
 * @brief Regular expressions for matching edition names.
 * @description This object contains regular expressions for various edition names.
 */
export const EDITION_EXPS = {
  internal: /\b(INTERNAL)\b/i,
  remastered: /\b(Remastered|Anniversary|Restored)\b/i,
  imax: /\b(IMAX)\b/i,
  unrated: /\b(Uncensored|Unrated)\b/i,
  extended: /\b(Extended|Uncut|Ultimate|Rogue|Collector)\b/i,
  theatrical: /\b(Theatrical)\b/i,
  directors: /\b(Directors?)\b/i,
  fanEdit: /\b(Despecialized|Fan.?Edit)\b/i,
  limited: /\b(LIMITED)\b/i,
  hdr: /\b(HDR)\b/i,
  threeD: /\b(3D)\b/i,
  hsbs: /\b(Half-?SBS|HSBS)\b/i,
  sbs: /\b((?<!H|HALF-)SBS)\b/i,
  hou: /\b(HOU)\b/i,
  uhd: /\b(UHD)\b/i,
  oar: /\b(OAR)\b/i,
  dolbyVision: /\b(DV(\b(HDR10|HLG|SDR))?)\b/i,
  hardcodedSubs: /\b((?<hcsub>(\w+(?<!SOFT|HORRIBLE)SUBS?))|(?<hc>(HC|SUBBED)))\b/i,
  deletedScenes: /\b((Bonus.)?Deleted.Scenes)\b/i,
  bonusContent:
    /\b((Bonus|Extras|Behind.the.Scenes|Making.of|Interviews|Featurettes|Outtakes|Bloopers|Gag.Reel).(?!(Deleted.Scenes)))\b/i,
  bw: /\b(BW)\b/i
};
