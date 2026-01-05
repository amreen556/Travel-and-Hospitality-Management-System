import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(data => {
      this.flights = data;
      this.flights.forEach(flight => {
        this.flightService.getFlightImages(flight.flightID).subscribe(images => {
          if (images.length > 0) {
            flight.imageUrl = images[0].url;
          }
        });
      });
    });
  }

  editFlight(id: string): void {
    this.router.navigate(['/flights/edit', id]);
  }

  deleteFlight(id: string): void {
    this.router.navigate(['/flights/delete', id]);
  }

  addFlight(): void {
    this.router.navigate(['/flights/add']);
  }
}
