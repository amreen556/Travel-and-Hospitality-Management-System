import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItineraryService } from '../services/itinerary.service';
import { EditItinerary } from '../models/edit-itinerary.model';
import { Itinerary } from '../models/itinerary.model';
@Component({
  selector: 'app-edit-itinerary',
  templateUrl: './edit-itinerary.component.html',
  styleUrls: ['./edit-itinerary.component.css']
})
export class EditItineraryComponent implements OnInit {
  itineraryForm: FormGroup;
  itineraryId: string = '';

  constructor(
    private fb: FormBuilder,
    private itineraryService: ItineraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itineraryForm = this.fb.group({
      userID: ['', Validators.required],
      packageID: ['', Validators.required],
      customizationDetails: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.itineraryId = this.route.snapshot.paramMap.get('id') || '';
    this.itineraryService.getById(this.itineraryId).subscribe((itinerary: Itinerary) => {
      this.itineraryForm.patchValue(itinerary);
    });
  }

  onSubmit(): void {
    if (this.itineraryForm.valid) {
      const updatedItinerary: EditItinerary = this.itineraryForm.value;
      this.itineraryService.update(this.itineraryId, updatedItinerary).subscribe(() => {
        this.router.navigate(['/itineraries']);
      });
    }
  }
}
