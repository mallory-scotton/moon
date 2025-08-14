/** Dependencies */
import { TMDBImage } from '.';

/**
 * @brief Network details
 * @description Contains the details of a network
 */
export interface TMDBNetworkDetails {
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

/**
 * @brief Network images information
 * @description Contains the details of network images information
 */
export interface TMDBNetworkImages {
  id: number;
  logos: TMDBImage[];
}
