/** Dependencies */
import { TMDBReview } from '.';

/**
 * @brief Review details
 * @description Contains the details of a review
 */
export interface TMDBReviewDetails extends TMDBReview {
  iso_639_1: string;
  media_id: number;
  media_title: number;
  media_type: number;
}
