/** Dependencies */
import { FFprobe } from '../src';

/**
 * @brief FFprobe class
 * @description This class provides an interface for interacting with the FFprobe tool.
 */
describe('FFprobe', () => {
  // Check if FFprobe is defined
  it('should be defined', () => {
    expect(FFprobe).toBeDefined();
  });

  // Check if FFprobe instance is created
  it('should create an instance', () => {
    const ffprobeInstance = new FFprobe();
    expect(ffprobeInstance).toBeInstanceOf(FFprobe);
  });

  // Check if FFprobe methods are defined
  it('should have methods defined', () => {
    const ffprobeInstance = new FFprobe();
    expect(ffprobeInstance.getMediaInfo).toBeDefined();
    expect(ffprobeInstance.getChapters).toBeDefined();
    expect(ffprobeInstance.getFormat).toBeDefined();
    expect(ffprobeInstance.getStreams).toBeDefined();
  });

  // Check if the FFprobe instance throw an error on unknown file
  it('should throw an error on unknown file', async () => {
    const ffprobeInstance = new FFprobe();
    await expect(ffprobeInstance.getMediaInfo('unknown.mp4')).rejects.toThrow();
  });

  // Check if the FFprobe instance can retrieve streams info
  it('should retrieve streams info', async () => {
    const ffprobeInstance = new FFprobe();
    const streams = await ffprobeInstance.getStreams('__tests__/resources/test.mkv');
    expect(streams).toBeDefined();
    expect(Array.isArray(streams)).toBe(true);
    expect(streams.length).toBeGreaterThan(0);
    expect(streams[0]).toHaveProperty('index');
    expect(streams[0]).toHaveProperty('codec_name');
  });

  // Check if the FFprobe instance can retrieve format info
  it('should retrieve format info', async () => {
    const ffprobeInstance = new FFprobe();
    const format = await ffprobeInstance.getFormat('__tests__/resources/test.mkv');
    expect(format).toBeDefined();
    expect(format).toHaveProperty('format_name');
    expect(format).toHaveProperty('duration');
  });

  // Check if the FFprobe instance can retrieve chapters info
  it('should retrieve chapters info', async () => {
    const ffprobeInstance = new FFprobe();
    const chapters = await ffprobeInstance.getChapters('__tests__/resources/test.mkv');
    expect(chapters).toBeDefined();
    expect(Array.isArray(chapters)).toBe(true);
    expect(chapters.length).toBe(0);
  });

  // Check if the FFprobe instance can retrieve media info
  it('should retrieve media info', async () => {
    const ffprobeInstance = new FFprobe();
    const mediaInfo = await ffprobeInstance.getMediaInfo('__tests__/resources/test.mkv');
    expect(mediaInfo).toBeDefined();
    expect(mediaInfo).toHaveProperty('streams');
    expect(mediaInfo).toHaveProperty('format');
    expect(mediaInfo.streams.length).toBeGreaterThan(0);
    expect(mediaInfo.format).toHaveProperty('format_name');
  });
});
