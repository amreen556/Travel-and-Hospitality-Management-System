export interface Flight {
  flightID: string;
  airline: string;
  departure: string;
  arrival: string;
  price: number;
  availability: number;
  imageUrl?: string; // Added for displaying image
  type: 'flight' 
}
