export interface EditBooking {
  type: string;
  status: string;
  payment2Id?: string; // Optional GUID
}
