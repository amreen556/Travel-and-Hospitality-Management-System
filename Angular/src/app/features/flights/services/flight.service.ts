import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Flight } from '../models/flight.model';
import { AddFlight } from '../models/add-flight.model';
import { EditFlight } from '../models/edit-flight.model';
import { FlightImageDto } from '../models/FlightImageDto.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'https://localhost:7132/api/Flight';

  constructor(private http: HttpClient) {}

  // 🔍 Get all flights
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  // 🔍 Get a flight by ID
  getFlight(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`);
  }

  // ➕ Add a new flight
  addFlight(flight: AddFlight): Observable<Flight> {
    return this.http.post<Flight>(this.apiUrl, flight);
  }

  // ✏️ Update an existing flight
  updateFlight(id: string, flight: EditFlight): Observable<Flight> {
    return this.http.put<Flight>(`${this.apiUrl}/${id}`, flight);
  }

  // ❌ Delete a flight
  deleteFlight(id: string): Observable<Flight> {
    return this.http.delete<Flight>(`${this.apiUrl}/${id}`);
  }

  // 📤 Upload a flight image
  uploadFlightImage(formData: FormData): Observable<FlightImageDto> {
    const flightId = formData.get('flightID');
    return this.http.post<FlightImageDto>(
      `${this.apiUrl}/${flightId}/upload-image`,
      formData
    );
  }

  // 📥 Get all images for a flight
  getFlightImages(flightId: string): Observable<FlightImageDto[]> {
    return this.http.get<FlightImageDto[]>(
      `${this.apiUrl}/${flightId}/images`
    );
  }
}
