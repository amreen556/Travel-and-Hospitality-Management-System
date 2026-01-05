import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItineraryService } from '../services/itinerary.service';

@Component({
  selector: 'app-delete-itinerary',
  templateUrl: './delete-itinerary.component.html',
  styleUrls: ['./delete-itinerary.component.css']
})
export class DeleteItineraryComponent implements OnInit {
  itineraryId: string = '';

  constructor(
    private itineraryService: ItineraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itineraryId = this.route.snapshot.paramMap.get('id') || '';
    this.itineraryService.delete(this.itineraryId).subscribe(() => {
      this.router.navigate(['/itineraries']);
    });
  }
}
