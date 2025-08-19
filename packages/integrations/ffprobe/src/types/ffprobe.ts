/**
 * @brief Boolean representation used by FFProbe
 * @description String-based boolean type where '0' represents false and '1' represents true, as used in FFProbe output
 */
type FFProbeBoolean = '0' | '1';

/**
 * @brief Base interface for side data objects
 * @description Common structure for all side data types, containing the basic side_data_type field
 */
interface BaseSideData {
  side_data_type: string;
}

/**
 * @brief Unknown side data type interface
 * @description Represents side data of unknown type, used as fallback for unrecognized side data
 */
interface UnknownSideData extends BaseSideData {
  /**
   * Based on the C code related to the default side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2298
   */
  side_data_type: 'unknown';
}

/**
 * @brief Display matrix side data interface
 * @description Contains display matrix information including rotation data for video transformations
 */
interface DisplayMatrixSideData extends BaseSideData {
  /**
   * Based on the C code related to Display Matrix side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2300-L2304
   */
  side_data_type: 'Display Matrix';
  /**
   * Mismatches the type linked earlier because ffprobe JSON output
   * reads the printed integers for the display matrix as a string
   */
  displaymatrix: string;
  rotation: number;
}

/**
 * @brief Stereo 3D side data interface
 * @description Contains stereoscopic 3D information including the type of 3D encoding and inversion flag
 */
interface Stereo3dSideData extends BaseSideData {
  /**
   * Based on the C code related to Stereo 3D side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2306-L2308
   */
  side_data_type: 'Stereo 3D';
  /**
   * Based on the C code of the libauvutil stereo3d file
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/libavutil/stereo3d.c#L47-L56
   */
  type:
    | 'unknown'
    | '2D'
    | 'side by side'
    | 'top and bottom'
    | 'frame alternate'
    | 'checkerboard'
    | 'side by side (quincunx subsampling)'
    | 'interleaved lines'
    | 'interleaved columns';
  inverted: number;
}

/**
 * @brief Base interface for spherical mapping side data
 * @description Common structure for all spherical mapping types containing projection and orientation information
 */
interface BaseSphericalMappingSideData extends BaseSideData {
  /**
   * Based on the C code related to Spherical Mapping side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2310-L2326
   */
  side_data_type: 'Spherical Mapping';
  /**
   * Based on the C code of the libauvutil spherical file
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/libavutil/spherical.c#L55-L59
   */
  projection: string;
  yaw: number;
  pitch: number;
  roll: number;
}

/**
 * @brief Unknown spherical mapping projection interface
 * @description Represents spherical mapping with unknown projection type
 */
interface UnknownSphericalMappingSideData extends BaseSphericalMappingSideData {
  projection: 'unknown';
}

/**
 * @brief Equirectangular spherical mapping projection interface
 * @description Represents spherical mapping using equirectangular projection
 */
interface EquirectangularSphericalMappingSideData extends BaseSphericalMappingSideData {
  projection: 'equirectangular';
}

/**
 * @brief Cube map spherical mapping projection interface
 * @description Represents spherical mapping using cube map projection with padding information
 */
interface CubeMapSphericalMappingSideData extends BaseSphericalMappingSideData {
  projection: 'cubemap';
  /**
   * Based on the C code related to Cube Map Spherical Mapping side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2313
   */
  padding: number;
}

/**
 * @brief Tilted equirectangular spherical mapping projection interface
 * @description Represents spherical mapping using tilted equirectangular projection with boundary information
 */
interface TiltedEquirectangularSphericalMappingSideData extends BaseSphericalMappingSideData {
  projection: 'tiled equirectangular';
  /**
   * Based on the C code related to Cube Map Spherical Mapping side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2315-L2321
   */
  bound_left: number;
  bound_top: number;
  bound_right: number;
  bound_bottom: number;
}

/**
 * @brief Union type for all spherical mapping side data types
 * @description Represents any of the possible spherical mapping projection types
 */
type SphericalMappingSideData =
  | UnknownSphericalMappingSideData
  | EquirectangularSphericalMappingSideData
  | CubeMapSphericalMappingSideData
  | TiltedEquirectangularSphericalMappingSideData;

/**
 * @brief Skip samples side data interface
 * @description Contains information about samples to skip at the beginning and padding to discard at the end
 */
interface SkipSamplesSideData extends BaseSideData {
  /**
   * Based on the C code related to Skip Samples side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2328-L2331
   */
  side_data_type: 'Skip Samples';
  skip_samples: number;
  discard_padding: number;
  skip_reason: number;
  discard_reason: number;
}

/**
 * @brief Base interface for mastering display metadata side data
 * @description Common structure for mastering display metadata containing display characteristics
 */
interface BaseMasteringDisplayMetadataSideData extends BaseSideData {
  /**
   * Based on the C code related to Mastering display metadata side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2333-L2350
   */
  side_data_type: 'Mastering display metadata';
}

/**
 * @brief Primaries mastering display metadata side data interface
 * @description Contains color primaries information for mastering display metadata
 */
interface PrimariesMasteringDisplayMetadataSideData extends BaseMasteringDisplayMetadataSideData {
  /**
   * Based on the C code related to Primaries Mastering display metadata side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2336-L2344
   */
  red_x: string;
  red_y: string;
  green_x: string;
  green_y: string;
  blue_x: string;
  blue_y: string;

  white_point_x: string;
  white_point_y: string;
}

/**
 * @brief Luminance mastering display metadata side data interface
 * @description Contains luminance information for mastering display metadata
 */
interface LuminanceMasteringDisplayMetadataSideData extends BaseMasteringDisplayMetadataSideData {
  /**
   * Based on the C code related to Luminance Mastering display metadata side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2348-L2349
   */
  min_luminance: string;
  max_luminance: string;
}

/**
 * @brief Union type for mastering display metadata side data
 * @description Represents any combination of primaries and luminance mastering display metadata
 */
type MasteringDisplayMetadataSideData =
  | PrimariesMasteringDisplayMetadataSideData
  | LuminanceMasteringDisplayMetadataSideData
  | (PrimariesMasteringDisplayMetadataSideData & LuminanceMasteringDisplayMetadataSideData);

/**
 * @brief Content light level metadata side data interface
 * @description Contains maximum content light level and maximum average light level information
 */
interface ContentLightLevelMetadataSideData extends BaseSideData {
  /**
   * Based on the C code related to Content light level metadata side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2352-L2354
   */
  side_data_type: 'Content light level metadata';
  max_content: number;
  max_average: number;
}

/**
 * @brief Dolby Vision configuration record side data interface
 * @description Contains Dolby Vision configuration parameters and compatibility information
 */
interface DoviConfigurationRecordSideData extends BaseSideData {
  /**
   * Based on the C code related to DOVI configuration record side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2356-L2364
   */
  side_data_type: 'DOVI configuration record';
  dv_version_major: number;
  dv_version_minor: number;
  dv_profile: number;
  dv_level: number;
  rpu_present_flag: number;
  el_present_flag: number;
  bl_present_flag: number;
  dv_bl_signal_compatibility_id: number;
}

/**
 * @brief Audio service type side data interface
 * @description Contains audio service type information for the stream
 */
interface AudioServiceTypeSideData extends BaseSideData {
  /**
   * Based on the C code related to Audio Service Type side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2366-L2367
   */
  side_data_type: 'Audio Service Type';
  service_type: number;
}

/**
 * @brief MPEGTS stream ID side data interface
 * @description Contains MPEG Transport Stream ID information for the stream
 */
interface MpegtsStreamIdSideData extends BaseSideData {
  /**
   * Based on the C code related to MPEGTS Stream ID side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2369
   */
  side_data_type: 'MPEGTS Stream ID';
  id: number;
}

/**
 * @brief CPB properties side data interface
 * @description Contains Coded Picture Buffer properties including bitrate and buffer information
 */
interface CpbPropertiesSideData extends BaseSideData {
  /**
   * Based on the C code related to CPB properties side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2371-L2376
   */
  side_data_type: 'CPB properties';
  max_bitrate: number;
  min_bitrate: number;
  avg_bitrate: number;
  buffer_size: number;
  vbv_delay: number;
}

/**
 * @brief WebVTT side data interface
 * @description Contains WebVTT subtitle information including ID and settings data
 */
interface WebvttSideData extends BaseSideData {
  /**
   * Based on the C code related to Webvtt side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2379-L2381
   */
  side_data_type: 'WebVTT ID' | 'WebVTT Settings';
  data?: string | undefined;
  data_hash: string;
}

/**
 * @brief Active format description side data interface
 * @description Contains active format description information for video content
 */
interface ActiveFormatDescriptionSideData extends BaseSideData {
  /**
   * Based on the C code related to Active format description side data section
   * @see https://github.com/FFmpeg/FFmpeg/blob/b37795688a9bfa6d5a2e9b2535c4b10ebc14ac5d/fftools/ffprobe.c#L2383
   */
  side_data_type: 'Active format description';
  active_format?: number;
}

/**
 * @brief Union type for all side data types
 * @description Represents any of the possible side data that can be attached to a stream
 */
type SideData =
  | UnknownSideData
  | DisplayMatrixSideData
  | Stereo3dSideData
  | SphericalMappingSideData
  | SkipSamplesSideData
  | MasteringDisplayMetadataSideData
  | ContentLightLevelMetadataSideData
  | DoviConfigurationRecordSideData
  | AudioServiceTypeSideData
  | MpegtsStreamIdSideData
  | AudioServiceTypeSideData
  | MpegtsStreamIdSideData
  | CpbPropertiesSideData
  | WebvttSideData
  | ActiveFormatDescriptionSideData;

/**
 * @brief Common tag names used in FFProbe output
 * @description Union type representing standard tag names that can appear in streams and formats
 */
type FFProbeCommonTag = 'language' | 'title' | 'encoder' | 'creation_time' | 'handler_name' | string;

/**
 * @brief FFProbe stream interface
 * @description Represents a single stream (video, audio, subtitle, etc.) in a media file with all its properties
 * Based on the XML definition of the ffprobe stream type
 * @see https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffprobe.xsd#L206
 */
export interface FFProbeStream {
  index: number;
  codec_name?: string | undefined;
  codec_long_name?: string | undefined;
  profile?: string | undefined;
  codec_type?: 'video' | 'audio' | 'images' | undefined;
  codec_time_base: string;
  codec_tag_string: string;
  codec_tag: string;
  extradata?: string | undefined;

  // Video attributes
  width?: number | undefined;
  height?: number | undefined;
  coded_width?: number | undefined;
  coded_height?: number | undefined;
  closed_captions?: FFProbeBoolean | undefined;
  has_b_frames?: number | undefined;
  sample_aspect_ratio?: string | undefined;
  display_aspect_ratio?: string | undefined;
  pix_fmt?: string | undefined;
  level?: number | undefined;
  color_range?: string | undefined;
  color_space?: string | undefined;
  color_transfer?: string | undefined;
  color_primaries?: string | undefined;
  chroma_location?: string | undefined;
  field_order?: string | undefined;
  timecode?: string | undefined;
  refs?: number | undefined;

  // Audio attributes
  sample_fmt?: string | undefined;
  sample_rate?: number | undefined;
  channels?: number | undefined;
  channel_layout?: string | undefined;
  bits_per_sample?: number | undefined;

  id: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts?: number | undefined;
  start_time?: number | undefined;
  duration_ts?: number | undefined;
  duration?: string | undefined;
  bit_rate?: number | undefined;
  max_bit_rate?: number | undefined;
  bits_per_raw_sample?: number | undefined;
  nb_frames?: number | undefined;
  nb_read_frames?: number | undefined;
  nb_read_packets?: number | undefined;

  // Not in XML file, but is still in the output of ffprobe MKV files.
  is_avc?: number | undefined;
  nal_length_size?: number | undefined;

  disposition: {
    default: number;
    dub: number;
    original: number;
    comment: number;
    lyrics: number;
    karaoke: number;
    forced: number;
    hearing_impaired: number;
    visual_impaired: number;
    clean_effects: number;
    attached_pic: number;
    timed_thumbnails?: number | undefined;
  };
  tags: {
    [tag: FFProbeCommonTag]: string | undefined;
  };

  side_data_list?: SideData[] | undefined;
}

/**
 * @brief FFProbe format interface
 * @description Represents the container format information of a media file
 * Based on the XML definition of the ffprobe format type
 * @see https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffprobe.xsd#L418
 */
export interface FFProbeFormat {
  filename: string;
  nb_streams: number;
  nb_programs: number;
  nb_stream_groups: number;
  format_name: string;
  format_long_name?: string | undefined;
  start_time?: number | undefined;
  duration?: number | undefined;
  size?: number | undefined;
  bit_rate?: number | undefined;
  probe_score?: number | undefined;
  tags: {
    [tag: FFProbeCommonTag]: string | undefined;
  };
}

/**
 * @brief FFProbe program version interface
 * @description Contains version and build information for the FFProbe program
 * Based on the XML definition of the ffprobe program version type
 * @see https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffprobe.xsd#L446
 */
export interface FFProbeProgramVersion {
  version: string;
  copyright: string;
  build_date?: string | undefined;
  build_time?: string | undefined;
  compiler_ident: string;
  configuration: string;
}

/**
 * @brief FFProbe chapter interface
 * @description Represents a chapter in a media file with timing and metadata information
 * Based on the XML definition of the ffprobe chapter type
 * @see https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffprobe.xsd#L461
 */
export interface FFProbeChapter {
  id: number;
  time_base: string;
  start: number;
  start_time?: number | undefined;
  end: number;
  end_time: number;
  tags: {
    [tag: FFProbeCommonTag]: string | undefined;
  };
}

/**
 * @brief FFProbe library version interface
 * @description Contains version information for FFmpeg libraries used by FFProbe
 * Based on the XML definition of the ffprobe library version type
 * @see https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffprobe.xsd#L474
 */
export interface FFProbeLibraryVersion {
  name: string;
  major: number;
  minor: number;
  micro: number;
  version: number;
  ident: string;
}

/**
 * @brief FFProbe result interface
 * @description Main result object containing all possible FFProbe output based on command flags
 * ffprobe possible result based on what flags are used
 * @example '--show_streams' get the streams
 * @example '--show_format' get the format of the container
 * @example '--show_chapters' get every chapters
 */
export interface FFProbeResult {
  streams: FFProbeStream[];
  format: FFProbeFormat;
  chapters: FFProbeChapter[];
}
