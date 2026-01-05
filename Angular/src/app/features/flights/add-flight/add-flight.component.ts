import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { AddFlight } from '../models/add-flight.model';
import { FlightImageDto } from '../models/FlightImageDto.model';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent {
  flightForm: FormGroup;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router
  ) {
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      availability: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0] ?? null;
  }

  onSubmit() {
    if (!this.flightForm.valid) return;

    const newFlight: AddFlight = this.flightForm.value;
    this.flightService.addFlight(newFlight).subscribe(flight => {
      if (this.imageFile) {
        const formData = new FormData();
        formData.append('file', this.imageFile);
        formData.append('flightID', flight.flightID);
        formData.append('title', 'Flight Image');

        this.flightService.uploadFlightImage(formData)
          .subscribe({
            next: () => this.router.navigate(['/flights']),
            error: () => this.router.navigate(['/flights'])
          });
      } else {
        this.router.navigate(['/flights']);
      }
    });
  }
}
