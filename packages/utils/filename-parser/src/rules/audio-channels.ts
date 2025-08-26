/**
 * @brief Regular expressions for matching audio channel configurations.
 * @description This object contains regular expressions for detecting various audio channel formats in strings.
 */
export const AUDIO_CHANNELS_EXPS = {
  '7.1': /\b(7.?[01])\b/i,
  '5.1': /\b((6[\W]0(?:ch)?)(?=[^\d]|$)|(5[\W][01](?:ch)?)(?=[^\d]|$)|5ch|6ch)\b/i,
  'stereo': /(((2[\W]0(?:ch)?)(?=[^\d]|$))|(stereo))/i,
  'mono': /((1[\W]0(?:ch)?)(?=[^\\d]|$)|(mono)|(1ch))/i
};
