/** Dependencies */
import { parseFilename } from '../src';
import { AudioCodec } from '../src/types';

/**
 * @brief Audio Codec Test Cases
 * @description Test cases for audio codec extraction from filenames.
 */
const CASES: Array<{ input: string; expected: AudioCodec | undefined }> = [
  { input: 'Hannibal 2001 4K UHD Dolby Vision MP4 DD+5 1 H265-d3g', expected: 'dolby digital' },
  { input: 'Aladdin 2019 720p BluRay x264 AC3 5 1-OMEGA', expected: 'dolby digital' },
  { input: 'Abbot and Costello Meet Frankenstein 1948 BluRay 1080p HEVC Dts Stereo-D3FiL3R', expected: 'dts' },
  {
    input: 'The.Daily.Show.2015.07.01.Kirsten.Gillibrand.Extended.720p.Comedy.Central.WEBRip.AAC2.0.x264-BTW.mkv',
    expected: 'aac'
  },
  { input: 'Girl on the Third Floor 2019 BRRip x264 AAC-SSN', expected: 'aac' },
  { input: 'New Eden S01E01 Who Are These Women CRAV WEB-DL AAC2 0 H 264-BTW', expected: 'aac' },
  { input: 'South Park S20E08 Members Only Uncensored 1080p WEB-DL HEVC x265 AAC2ch-NEBO666', expected: 'aac' },
  { input: 'Behind the Candelabra 2013 BDRip 1080p DTS-HD extra-HighCode', expected: 'dts-hd' },
  { input: 'Ex Machina 2015 UHD BluRay 2160p DTS-X 7 1 HDR x265 10bit-CHD', expected: 'dts-hd' },
  { input: 'Frozen.2.2019.German.DL.EAC3.1080p.DSNP.WEB.H265-ZeroTwo', expected: 'dolby digital plus' }
];

/**
 * @brief Audio Codec Tests
 * @description Tests for the audio codec filename parsing.
 */
describe('Audio Codec Filename Parsing', () => {
  it.each(CASES)('should parse $expected in $input correctly', ({ input, expected }) => {
    const result = parseFilename(input, false);
    expect(result.audioCodec).toBe(expected);
  });
});
