/** Dependencies */
import { parseFilename } from '../src';
import { Language } from '../src/types';

/**
 * @brief Language extraction test cases
 * @description This section contains test cases for extracting languages from filenames.
 */
const CASES: Array<{ input: string; expected: Language[] }> = [
  { input: 'Castle.2009.S01E14.English.HDTV.XviD-LOL', expected: ['english'] },
  { input: 'Castle.2009.S01E14.French.HDTV.XviD-LOL', expected: ['french'] },
  { input: 'Ouija.Origin.of.Evil.2016.MULTi.TRUEFRENCH.1080p.BluRay.x264-MELBA', expected: ['french', 'english'] },
  { input: 'Everest.2015.FRENCH.VFQ.BDRiP.x264-CNF30', expected: ['french'] },
  {
    input: 'Showdown.In.Little.Tokyo.1991.MULTI.VFQ.VFF.DTSHD-MASTER.1080p.BluRay.x264-ZombiE',
    expected: ['french', 'english']
  },
  { input: 'The.Polar.Express.2004.MULTI.VF2.1080p.BluRay.x264-PopHD', expected: ['french', 'english'] },
  { input: 'Castle.2009.S01E14.Spanish.HDTV.XviD-LOL', expected: ['spanish'] },
  { input: 'Castle.2009.S01E14.German.HDTV.XviD-LOL', expected: ['german'] },
  { input: 'Castle.2009.S01E14.Italian.HDTV.XviD-LOL', expected: ['italian'] },
  { input: 'Castle.2009.S01E14.Danish.HDTV.XviD-LOL', expected: ['danish'] },
  { input: 'Castle.2009.S01E14.Dutch.HDTV.XviD-LOL', expected: ['dutch'] },
  { input: 'Castle.2009.S01E14.Japanese.HDTV.XviD-LOL', expected: ['japanese'] },
  { input: 'Castle.2009.S01E14.Cantonese.HDTV.XviD-LOL', expected: ['cantonese'] },
  { input: 'Castle.2009.S01E14.Mandarin.HDTV.XviD-LOL', expected: ['mandarin'] },
  { input: 'Castle.2009.S01E14.Korean.HDTV.XviD-LOL', expected: ['korean'] },
  { input: 'Castle.2009.S01E14.Russian.HDTV.XviD-LOL', expected: ['russian'] },
  { input: 'Castle.2009.S01E14.Ukrainian.HDTV.XviD-LOL', expected: ['ukrainian'] },
  { input: 'Castle.2009.S01E14.Ukr.HDTV.XviD-LOL', expected: ['ukrainian'] },
  { input: 'Castle.2009.S01E14.Polish.HDTV.XviD-LOL', expected: ['polish'] },
  { input: 'Castle.2009.S01E14.Vietnamese.HDTV.XviD-LOL', expected: ['vietnamese'] },
  { input: 'Castle.2009.S01E14.Swedish.HDTV.XviD-LOL', expected: ['swedish'] },
  { input: 'Castle.2009.S01E14.Norwegian.HDTV.XviD-LOL', expected: ['norwegian'] },
  { input: 'Castle.2009.S01E14.Finnish.HDTV.XviD-LOL', expected: ['finnish'] },
  { input: 'Castle.2009.S01E14.Turkish.HDTV.XviD-LOL', expected: ['turkish'] },
  { input: 'Castle.2009.S01E14.Czech.HDTV.XviD-LOL', expected: ['czech'] },
  { input: 'Castle.2009.S01E14.Portuguese.HDTV.XviD-LOL', expected: ['portuguese'] },
  { input: 'Revolution S01E03 No Quarter 2012 WEB-DL 720p Nordic-philipo mkv', expected: ['nordic'] },
  { input: 'Constantine.2014.S01E01.WEBRiP.H264.AAC.5.1-NL.SUBS', expected: ['dutch'] },
  { input: 'Castle.2009.S01E14.HDTV.XviD.HUNDUB-LOL', expected: ['hungarian'] },
  { input: 'Castle.2009.S01E14.HDTV.XviD.ENG.HUN-LOL', expected: ['english', 'hungarian'] },
  { input: 'Castle.2009.S01E14.HDTV.XviD.HUN-LOL', expected: ['hungarian'] },
  { input: 'Castle.2009.S01E14.HDTV.XviD.CZ-LOL', expected: ['czech'] },
  { input: 'Peter.Rabbit.2.The.Runaway.2021.LATViAN.2160p.UHD.BLURAY.x265-UNDERDOG', expected: ['latvian'] },
  { input: 'Peter.Rabbit.2.The.Runaway.2021.LiTHUANiAN.2160p.UHD.BLURAY.x265-UNDERDOG', expected: ['lithuanian'] },
  { input: 'Passengers.2016.German.DL.AC3.Dubbed.1080p.WebHD.h264.iNTERNAL-PsO', expected: ['german', 'english'] },
  { input: 'Smurfs.​The.​Lost.​Village.​2017.​1080p.​BluRay.​HebDub.​x264-​iSrael', expected: ['hebrew'] },
  { input: 'The Danish Girl 2015', expected: ['english'] },
  { input: 'Nocturnal Animals (2016) MULTi VFQ English [1080p] BluRay x264-PopHD', expected: ['english', 'french'] },
  { input: 'Wonder.Woman.2017.720p.BluRay.DD5.1.x264-TayTO.CZ-FTU', expected: ['czech'] },
  {
    input: 'Fantastic.Beasts.The.Crimes.Of.Grindelwald.2018.2160p.WEBRip.x265.10bit.HDR.DD5.1-GASMASK',
    expected: ['english']
  },
  {
    input: 'Nick.and.Norahs.Infinite.Playlist.2008.CATALAN.MULTi.1080p.BluRay.x264-DESPACiTO',
    expected: ['catalan', 'english']
  },
  { input: 'Harry.Potter.And.The.Order.Of.The.Phoenix.2007.CHINESE.2160p.UHD.BluRay.X265-HOA', expected: ['chinese'] },
  { input: 'Seven.Years.of.Night.2018.PL.DUAL.1080p.BluRay.x264-FLAME', expected: ['polish', 'english'] },
  { input: 'Tenet.2020.THAI.2160p.UHD.BLURAY.x265-HOA', expected: ['thai'] },
  {
    input: 'Tenet 2020 1080p Multi Eng Hin Tam iMax BluRay 10Bit DD5 1 H265-IPT',
    expected: ['english', 'hindi', 'tamil']
  },
  {
    input: 'The Flying Guillotine 1975 CHI ENG DTS-HD DTS 1080p BluRay x264 HQ-TUSAHD',
    expected: ['english', 'chinese']
  },
  {
    input: 'The Incredible Story Of The Giant Pear 2017 SWE DAN DTS-HD DTS MULTISUBS 1080p BluRay x264 HQ-TUSAHD',
    expected: ['danish', 'swedish']
  },
  {
    input: 'Wonder.Woman.1984.2020.PLDUB.DUAL.HDR10Plus.2160p.UHD.BluRay.x265.iNTERNAL-PLHD',
    expected: ['polish', 'english']
  },
  { input: 'Wadjda.2012.ARABiC.1080p.BluRay.x264-CONSTANT', expected: ['arabic'] },
  { input: 'Arabic.12.1982.1080p.BluRay.x264-ROVERS', expected: ['english'] },
  { input: 'No.Country.for.Old.Men.1080p.BluRay.x264-HiGHTiMES', expected: ['english'] },
  { input: 'Cars.2.2011.ESTONiAN.DVDRip.x264-EMX', expected: ['estonian'] },
  { input: 'Cars.2.2011.EN.SE.FI.PAL.DVDR-AMIRITE', expected: ['english', 'swedish'] },
  {
    input: 'Cars.2.2011.ENG.DK.NO.ICE.READ.NFO.PAL.DVDR-WILDER',
    expected: ['english', 'danish', 'icelandic', 'norwegian']
  },
  { input: 'Scarface.1983.CE.UNCUT.DVDRip.XviD.iNT-TURKiSO', expected: ['english'] },
  { input: 'Scarface.1983.20th.AE.iNTERNAL.DVDRip.XviD-MHQ', expected: ['english'] },
  { input: 'The.Conjuring.The.Devil.Made.Me.Do.It.2021.SUBFRENCH.2160p.WEB.H265-McNULTY', expected: ['french'] },
  { input: 'Get.Him.To.The.Greek.UNRATED.FRENCH.720p.BluRay.x264-NERDHD', expected: ['french'] },
  { input: 'Maennertrip.UNRATED.German.AC3.Dubbed.1080p.Bluray.x264-CIS', expected: ['german'] },
  { input: 'Maennertrip.TS.MD.German.XViD.iNTERNAL-AOE', expected: ['german'] },
  { input: 'Maennertrip.EXTENDED.German.AC3.BDRip.XviD-RedRay', expected: ['german'] },
  { input: 'Get.Him.To.The.Greek.TRUEFRENCH.DVDRip.XviD-REVOLTE', expected: ['french'] },
  { input: 'The.Social.Network.R5.LD.German.XviD-CinePlexx', expected: ['german'] },
  { input: 'The.Social.Network.R5.LiNE.XviD-TWiZTED', expected: ['english'] },
  { input: 'Incassable.TRUE.FRENCH.PROPER.READ.NFO.DVDRiP.DiVX.SBC-KFT', expected: ['french'] },
  { input: 'Space.Jam.A.New.Legacy.2021.ROMANiAN.2160p.UHD.BLURAY.x265-UNDERDOG', expected: ['romanian'] },
  { input: 'Space.Jam.A.New.Legacy.2021.RoDubbed.2160p.UHD.BLURAY.x265-UNDERDOG', expected: ['romanian'] },
  { input: 'Space.Jam.A.New.Legacy.2021.RO.2160p.UHD.BLURAY.x265-UNDERDOG', expected: ['romanian'] },
  { input: 'Spider-Man.No.Way.Home.2021.SLOVAK.2160p.UHD.BLURAY.x265-UNDERDOG', expected: ['slovak'] },
  {
    input: 'A.Serbian.Film.2010.SERBIAN.UnCut.DTS-HD.DTS.NORDICSUBS.1080p.BluRay.x264.HQ-TUSAHD',
    expected: ['serbian', 'nordic']
  }
];

/**
 * @brief Language extraction test cases
 * @description This section contains test cases for extracting languages from filenames.
 */
describe('Language Extraction', () => {
  it.each(CASES)('should extract languages from %p', ({ input, expected }) => {
    const result = parseFilename(input, false);
    for (const lang of expected) {
      expect(result.languages).toContain(lang);
    }
  });
});
