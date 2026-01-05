import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { EditBooking } from '../models/edit-booking.model';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  bookingForm: FormGroup;
  bookingId: string = '';

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      type: ['', Validators.required],
      status: ['', Validators.required],
      payment2Id: [''] // Optional field
    });
  }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id') || '';
    this.bookingService.getBooking(this.bookingId).subscribe(booking => {
      this.bookingForm.patchValue({
        type: booking.type,
        status: booking.status,
        payment2Id: booking.payment2Id
      });
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;

      const updatedBooking: EditBooking = {
        type: formValue.type,
        status: formValue.status,
        payment2Id: formValue.payment2Id?.trim() === '' ? null : formValue.payment2Id
      };

      this.bookingService.updateBooking(this.bookingId, updatedBooking).subscribe({
        next: () => this.router.navigate(['/bookings']),
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update booking. Please check the data and try again.');
        }
      });
    }
  }
}
