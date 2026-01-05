export interface CartItem {
  id: string;
  orderBasketId: string;
  productId: string;
  name: string;
  location: string;
  unitPrice: number;
  imageUrl?: string;
  quantity: number;
  addedDate: Date;
  type: 'hotel' | 'flight' | 'package';
  includedHotels?: string;
  includedFlights?: string;
}