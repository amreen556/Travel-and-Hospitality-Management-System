
export interface Hotel {
  hotelID: string;
  name: string;
  location: string;
  roomsAvailable: number;
  rating: number;
  pricePerNight: number;
  imageUrl?: string; // Added for displaying image
}
