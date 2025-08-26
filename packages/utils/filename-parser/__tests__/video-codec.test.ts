/** Dependencies */
import { parseFilename } from '../src';
import { VideoCodec } from '../src/types';

/**
 * @brief Video Codec Test Cases
 * @description Test cases for video codec extraction from filenames.
 */
const CASES: Array<{ input: string; expected: VideoCodec | undefined }> = [
  { input: 'Terminator 3 Rise of The Machines 2003 HDDVD XvidHD 720p-NPW', expected: 'xvidhd' },
  { input: 'Cloverfield 2008 BRRip XvidHD 720p-NPW', expected: 'xvidhd' },
  { input: 'The Interview 2014 1080p WEB-DL x264 AAC MerryXmas', expected: 'x264' },
  { input: 'Half Baked 1998 HDRip XviD AC3-FLAWL3SS', expected: 'xvid' },
  { input: 'Hidden Figures 2016 DVDSCR XVID-FrangoAssado', expected: 'xvid' },
  { input: 'Vice 2018 DVDScr Xvid AC3 HQ Hive-CM8', expected: 'xvid' },
  { input: 'The Dark Knight[2008]DvDrip-aXXo [pendhu]', expected: undefined },
  { input: 'Bridesmaids[2011][Unrated Edition]DvDrip AC3-aXXo', expected: undefined },
  { input: 'Get Out 2017 BluRay 10Bit 1080p DD5 1 H265-d3g', expected: 'h265' },
  { input: 'Minions 2015 720p HC HDRip X265 AC3 TiTAN', expected: 'x265' },
  { input: "Marvel's The Avengers 2012 BluRay 1080p DD5 1 10Bit H265-d3g", expected: 'h265' },
  { input: 'Exodus Gods and Kings 2014 MULTi 2160p UHD BluRay x265-SESKAPiLE', expected: 'x265' },
  { input: 'The Incredibles 2004 BluRay x264-jlw', expected: 'x264' },
  { input: 'Jack Reacher 2012 720p BluRay X264-AMIABLE', expected: 'x264' },
  { input: 'Super Troopers 2 2018 1080p WEB-DL H264 AC3-EVO', expected: 'h264' },
  { input: 'The.Middle.720p.HEVC-MeGusta-Pre', expected: 'hevc' },
  { input: 'Cloud.Atlas.2012.BluRay.1080p.VC1.5.1.WMV-INSECTS', expected: 'wmv' },
  { input: 'The.Book.Of.Eli.2010.Bluray.VC1.1080P.5.1.WMV-NOVO', expected: 'wmv' }
];

/**
 * @brief Video Codec Test Cases
 * @description Test cases for video codec extraction from filenames.
 */
describe('Video Codec Filename Parsing', () => {
  it.each(CASES)('should parse $expected in $input correctly', ({ input, expected }) => {
    const result = parseFilename(input, false);
    expect(result.videoCodec).toBe(expected);
  });
});
