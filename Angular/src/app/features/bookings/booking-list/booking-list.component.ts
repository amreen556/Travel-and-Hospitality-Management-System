import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { BookingListItem } from '../models/booking-list.model';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: BookingListItem[] = [];

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(data => {
      this.bookings = data;
    });
  }

  editBooking(id: string): void {
    this.router.navigate(['/bookings/edit', id]);
  }

  deleteBooking(id: string): void {
    this.router.navigate(['/bookings/delete', id]);
  }

  addBooking(): void {
    this.router.navigate(['/bookings/add']);
  }
}
