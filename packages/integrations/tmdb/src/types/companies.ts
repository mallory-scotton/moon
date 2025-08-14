/** Dependencies */
import { TMDBImage } from '.';

/**
 * @brief Company information
 * @description Contains the details of a company
 */
export interface TMDBCompanyDetails {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company?: TMDBParentCompany;
}

/**
 * @brief Parent company information
 * @description Contains the details of a parent company
 */
export interface TMDBParentCompany {
  name: string;
  id: number;
  logo_path: string;
}

/**
 * @brief Alternative names information
 * @description Contains the details of alternative names
 */
export interface TMDBAlternativeNames {
  id: number;
  results: TMDBName[];
}

/**
 * @brief Name information
 * @description Contains the details of a name
 */
export interface TMDBName {
  name: string;
  type: string;
}

/**
 * @brief Company images information
 * @description Contains the details of company images
 */
export interface TMDBCompanyImages {
  id: number;
  logos: TMDBImage[];
}
