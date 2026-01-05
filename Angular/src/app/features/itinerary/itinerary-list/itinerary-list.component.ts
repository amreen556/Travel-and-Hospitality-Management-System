import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../models/itinerary.model';

@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})
export class ItineraryListComponent implements OnInit {
  itineraries: Itinerary[] = [];

  constructor(private itineraryService: ItineraryService, private router: Router) {}

  ngOnInit(): void {
    this.loadItineraries();
  }

  loadItineraries(): void {
    this.itineraryService.getAll().subscribe(data => {
      this.itineraries = data;
    });
  }

  addItinerary(): void {
    this.router.navigate(['/itineraries/add']);
  }

  editItinerary(id: string): void {
    this.router.navigate(['/itineraries/edit', id]);
  }

  deleteItinerary(id: string): void {
    this.router.navigate(['/itineraries/delete', id]);
  }
}
