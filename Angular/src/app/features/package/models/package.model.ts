export interface Package {
  packageID: string;
  name: string;
  includedHotels: string;
  includedFlights: string;
  activities: string;
  price: number;
  imageUrl?: string; // Added for displaying image
}
