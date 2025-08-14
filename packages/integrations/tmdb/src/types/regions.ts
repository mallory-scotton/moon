/** Dependencies */
import { TMDBCountryCode } from '.';

/**
 * @brief Represents a geographical region.
 * @description This interface defines the properties of a geographical region, including its ISO 3166-1 code and English name.
 */
export interface TMDBRegion {
  iso_3166_1: TMDBCountryCode;
  english_name: string;
  native_name: string;
}
