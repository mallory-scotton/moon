/** Dependencies */
import { TMDBRegion } from './regions';
import { TMDBCountryCode } from '.';

/**
 * @brief Represents a watch provider.
 * @description This interface defines the properties of a watch provider, including its display priorities and display priority.
 */
export interface TMDBWatchProvider {
  display_priorities: { [K in TMDBCountryCode]: number };
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

/**
 * @brief Represents a region.
 * @description This interface defines the properties of a region, including its ISO 3166-1 code and English name.
 */
export interface TMDBRegionResult {
  results: Array<TMDBRegion>;
}

/**
 * @brief Represents a watch provider.
 * @description This interface defines the properties of a watch provider, including its display priorities and display priority.
 */
export interface TMDBWatchProviderResult {
  results: Array<TMDBWatchProvider>;
}

/**
 * @brief Represents a flatrate watch provider.
 * @description This interface defines the properties of a flatrate watch provider, including its display priority and logo path.
 */
export interface TMDBFlatrate {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

/**
 * @brief Represents a rent watch provider.
 * @description This interface defines the properties of a rent watch provider, including its display priority and logo path.
 */
export interface TMDBRent {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

/**
 * @brief Represents a buy watch provider.
 * @description This interface defines the properties of a buy watch provider, including its display priority and logo path.
 */
export interface TMDBBuy {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

/**
 * @brief Represents a watch locale.
 * @description This interface defines the properties of a watch locale, including its link and available watch providers.
 */
export interface TMDBWatchLocale {
  AR: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  AT: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  AU: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  BE: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  BR: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  CA: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  CH: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  CL: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  CO: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  CZ: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  DE: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  DK: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  EC: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  EE: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  ES: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  FI: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  FR: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  GB: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  GR: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  HU: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  ID: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  IE: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  IN: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  IT: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  JP: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  KR: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  LT: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  LV: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  MX: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  MY: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  NL: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  NO: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  NZ: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  PE: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  PH: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  PL: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  PT: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  RO: {
    link: string;
    flatrate: TMDBFlatrate[];
  };
  RU: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  SE: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  SG: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  TH: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  TR: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  US: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  VE: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  ZA: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
}

/**
 * @brief Represents the watch providers for a specific media item.
 * @description This interface defines the properties of the watch providers, including their availability in different regions.
 */
export interface TMDBWatchProviders {
  id: number;
  results: TMDBWatchLocale;
}
