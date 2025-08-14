/** Dependencies */
import { TMDBMovie } from '.';
import { TMDBPageOption } from './options';

/**
 * @brief Keywords options
 * @description Contains the details of keywords options
 */
export interface TMDBKeywordsOptions extends TMDBPageOption {
  include_adult?: boolean;
  language?: string;
}

/**
 * @brief Belonging movies information
 * @description Contains the details of belonging movies information
 */
export interface TMDBBelongingMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

/**
 * @brief Keyword details
 * @description Contains the details of keyword information
 */
export interface TMDBKeyword {
  id: number;
  name: string;
}

/**
 * @brief Keyword details with movies
 * @description Contains the details of keyword information along with belonging movies
 */
export interface TMDBKeywords {
  id: number;
  keywords: TMDBKeyword[];
}
