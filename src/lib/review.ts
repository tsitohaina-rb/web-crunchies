export interface ReviewType {
  id: number;
  name: string;
  status: boolean;
  countryCode: string;
  rating: number;
  text: string;
  date: string;
}

// Calculate the average rating of all reviews
export const averageRating = (reviews: ReviewType[]): number => {
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};
