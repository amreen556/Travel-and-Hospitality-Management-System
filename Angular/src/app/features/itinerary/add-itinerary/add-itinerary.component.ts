import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItineraryService } from '../services/itinerary.service';
import { AddItinerary } from '../models/add-itinerary.model';

@Component({
  selector: 'app-add-itinerary',
  templateUrl: './add-itinerary.component.html',
  styleUrls: ['./add-itinerary.component.css']
})
export class AddItineraryComponent {
  itineraryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itineraryService: ItineraryService,
    private router: Router
  ) {
    this.itineraryForm = this.fb.group({
      userID: ['', Validators.required],
      packageID: ['', Validators.required],
      customizationDetails: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.itineraryForm.valid) {
      const newItinerary: AddItinerary = this.itineraryForm.value;

      this.itineraryService.create(newItinerary).subscribe(() => {
        this.router.navigate(['/itineraries']);
      });
    }
  }
}
