/** Dependencies */
import { parseFilename } from '../src';
import { AudioChannels } from '../src/types';

/**
 * @brief Audio Channels Test Cases
 * @description Test cases for audio channels extraction from filenames.
 */
const CASES: Array<{ input: string; expected: AudioChannels | undefined }> = [
  { input: 'Hannibal 2001 4K UHD Dolby Vision MP4 DD+5 1 H265-d3g', expected: '5.1' },
  { input: 'Aladdin 2019 720p BluRay x264 AC3 5 1-OMEGA', expected: '5.1' },
  { input: 'Trespass Against Us (2017) 1080p BluRay x265 6ch -Dtech mkv', expected: '5.1' },
  { input: 'Abbot and Costello Meet Frankenstein 1948 BluRay 1080p HEVC Dts Stereo-D3FiL3R', expected: 'stereo' },
  {
    input: 'The.Daily.Show.2015.07.01.Kirsten.Gillibrand.Extended.720p.Comedy.Central.WEBRip.AAC2.0.x264-BTW.mkv',
    expected: 'stereo'
  }
];

/**
 * @brief Audio Channels Tests
 * @description Tests for the audio channels filename parsing.
 */
describe('Audio Channels Filename Parsing', () => {
  it.each(CASES)('should parse $expected in $input correctly', ({ input, expected }) => {
    const result = parseFilename(input, false);
    expect(result.audioChannels).toBe(expected);
  });
});
