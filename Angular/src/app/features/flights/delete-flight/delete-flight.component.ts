import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css']
})
export class DeleteFlightComponent implements OnInit {
  flightId: string = '';

  constructor(private flightService: FlightService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id') || '';
    this.flightService.deleteFlight(this.flightId).subscribe(() => {
      this.router.navigate(['/flights']);
    });
  }
}
