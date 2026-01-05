import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddBooking } from '../models/add-booking.model';
import { BookingListItem } from '../models/booking-list.model';
import { EditBooking } from '../models/edit-booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7132/api/Booking';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<BookingListItem[]> {
    return this.http.get<BookingListItem[]>(this.apiUrl);
  }

  getBooking(id: string): Observable<BookingListItem> {
    return this.http.get<BookingListItem>(`${this.apiUrl}/${id}`);
  }

  addBooking(booking: AddBooking): Observable<BookingListItem> {
    return this.http.post<BookingListItem>(this.apiUrl, booking);
  }

  updateBooking(id: string, booking: EditBooking): Observable<BookingListItem> {
    return this.http.put<BookingListItem>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: string): Observable<BookingListItem> {
    return this.http.delete<BookingListItem>(`${this.apiUrl}/${id}`);
  }
}
