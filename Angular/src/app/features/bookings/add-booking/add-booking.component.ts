import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { AddBooking } from '../models/add-booking.model';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent {
  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      userID: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      payment2Id: [''] // ✅ Corrected field name
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const newBooking: AddBooking = this.bookingForm.value;

      this.bookingService.addBooking(newBooking).subscribe(() => {
        this.router.navigate(['/bookings']);
      });
    }
  }
}
