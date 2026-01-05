import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { EditFlight } from '../models/edit-flight.model';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {
  flightForm: FormGroup;
  flightId: string = '';

  constructor(private fb: FormBuilder, private flightService: FlightService, private route: ActivatedRoute, private router: Router) {
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      price: [0, Validators.required],
      availability: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id') || '';
    this.flightService.getFlight(this.flightId).subscribe(flight => {
      this.flightForm.patchValue(flight);
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      const updatedFlight: EditFlight = {
        ...this.flightForm.value
      };
      this.flightService.updateFlight(this.flightId, updatedFlight).subscribe(() => {
        this.router.navigate(['/flights']);
      });
    }
  }
}
