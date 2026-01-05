export interface Review {
  reviewID: string;
  userID: string;
  productId: string;
  rating: number;
  comment: string;
  timestamp: string;
  productName?: string;
  productType?: 'hotel' | 'flight' | 'package' | 'unknown';
}
