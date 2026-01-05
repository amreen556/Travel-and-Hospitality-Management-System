export interface BookingListItem {
  bookingID: string;
  userID: string;
  type: string;
  status: string;
  payment2Id?: string; // ✅ Match backend property
}
