/**
 * @brief A list of common file extensions.
 * @description This constant contains a list of file extensions used in video files.
 */
export const FILE_EXTENSIONS = [
  // Unknown
  '.webm',
  // SDTV
  '.m4v',
  '.3gp',
  '.nsv',
  '.ty',
  '.strm',
  '.rm',
  '.rmvb',
  '.m3u',
  '.ifo',
  '.mov',
  '.qt',
  '.divx',
  '.xvid',
  '.bivx',
  '.nrg',
  '.pva',
  '.wmv',
  '.asf',
  '.asx',
  '.ogm',
  '.ogv',
  '.m2v',
  '.avi',
  '.bin',
  '.dat',
  '.dvr-ms',
  '.mpg',
  '.mpeg',
  '.mp4',
  '.avc',
  '.vp3',
  '.svq3',
  '.nuv',
  '.viv',
  '.dv',
  '.fli',
  '.flv',
  '.wpl',

  // DVD
  '.img',
  '.iso',
  '.vob',

  // HD
  '.mkv',
  '.mk3d',
  '.ts',
  '.wtv',

  // Bluray
  '.m2ts'
];

/**
 * @brief A regular expression to match file extensions.
 * @description This regular expression is used to identify file extensions in a given string.
 */
const FILE_EXTENSION_EXP = /\.[a-z0-9]{2,4}$/i;

/**
 * @brief Removes the file extension from a given title.
 * @description This function takes a title string as input and removes the file extension if it exists.
 * @param title - The title string to process.
 * @returns The title string without the file extension.
 */
export function removeExtension(title: string): string {
  return title.replace(FILE_EXTENSION_EXP, (x: string) => {
    if (FILE_EXTENSIONS.some((ext) => ext === x)) {
      return '';
    }
    return x;
  });
}
