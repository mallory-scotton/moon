/**
 * @brief Movie title year regular expressions
 * @description Matches common movie title year formats.
 */
export const MOVIE_TITLE_YEAR_EXPS = [
  // Special, Despecialized, etc. Edition Movies, e.g: Mission.Impossible.3.Special.Edition.2011
  /^(?<title>(?![([]).+?)?(?:(?:[-_\W](?<![)[!]))*\(?\b(?<edition>(((Extended.|Ultimate.)?(Director.?s|Collector.?s|Theatrical|Anniversary|The.Uncut|Ultimate|Final(?=(.(Cut|Edition|Version)))|Extended|Rogue|Special|Despecialized|\d{2,3}(th)?.Anniversary)(.(Cut|Edition|Version))?(.(Extended|Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit))?|((Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit|Edition|Restored|((2|3|4)in1))))))\b\)?.{1,3}(?<year>(1(8|9)|20)\d{2}(?!p|i|\d+|\]|\W\d+)))+(\W+|_|$)(?!\\)/i,
  // Folder movie format, e.g: Blade Runner 2049 (2017)
  /^(?<title>(?![([]).+?)?(?:(?:[-_\W](?<![)[!]))*\((?<year>(1(8|9)|20)\d{2}(?!p|i|(1(8|9)|20)\d{2}|\]|\W(1(8|9)|20)\d{2})))+/i,
  // Normal movie format, e.g: Mission.Impossible.3.2011
  /^(?<title>(?![([]).+?)?(?:(?:[-_\W](?<![)[!]))*(?<year>(1(8|9)|20)\d{2}(?!p|i|(1(8|9)|20)\d{2}|\]|\W(1(8|9)|20)\d{2})))+(\W+|_|$)(?!\\)/i,
  // PassThePopcorn Torrent names: Star.Wars[PassThePopcorn]
  /^(?<title>.+?)?(?:(?:[-_\W](?<![()[!]))*(?<year>(\[\w *\])))+(\W+|_|$)(?!\\)/i,
  // That did not work? Maybe some tool uses [] for years. Who would do that?
  /^(?<title>(?![([]).+?)?(?:(?:[-_\W](?<![)!]))*(?<year>(1(8|9)|20)\d{2}(?!p|i|\d+|\W\d+)))+(\W+|_|$)(?!\\)/i,
  // As a last resort for movies that have ( or [ in their title.
  /^(?<title>.+?)?(?:(?:[-_\W](?<![)[!]))*(?<year>(1(8|9)|20)\d{2}(?!p|i|\d+|\]|\W\d+)))+(\W+|_|$)(?!\\)/i
];
