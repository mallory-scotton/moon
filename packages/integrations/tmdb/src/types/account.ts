/** Dependencies */
import { TMDBCountryCode } from '.';

/**
 * @brief Gravatar information
 * @description Contains the hash of the user's Gravatar image
 */
export interface TMDBGravatar {
  hash: string;
}

/**
 * @brief Avatar information
 * @description Contains the user's avatar information
 */
export interface TMDBAvatar {
  gravatar: TMDBGravatar;
}

/**
 * @brief Account information
 * @description Contains the user's account information
 */
export interface TMDBAccountDetails {
  avatar: TMDBAvatar;
  id: number;
  include_adult: boolean;
  iso_3166_1: TMDBCountryCode;
  iso_639_1: string;
  name: string;
  username: string;
}
