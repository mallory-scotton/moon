import { TMDBLanguageOption, TMDBMovie } from '.';

export interface TMDBCollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

export interface TMDBCollectionDetails extends TMDBCollection {
  parts: TMDBMovie[];
}

export interface TMDBCollectionImageOptions extends TMDBLanguageOption {
  /**
   * a list of ISO-639-1 values to query
   */
  include_image_language?: string[];
}
