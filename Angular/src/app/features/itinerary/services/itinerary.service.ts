import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddItinerary } from '../models/add-itinerary.model';
import { EditItinerary } from '../models/edit-itinerary.model';
import { Itinerary } from '../models/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private apiUrl = 'https://localhost:7132/api/Itinerary'; // Update if your base URL differs

  constructor(private http: HttpClient) {}

  getAll(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(this.apiUrl);
  }

  getById(id: string): Observable<Itinerary> {
    return this.http.get<Itinerary>(`${this.apiUrl}/${id}`);
  }

  create(itinerary: AddItinerary): Observable<Itinerary> {
    return this.http.post<Itinerary>(this.apiUrl, itinerary);
  }

  update(id: string, itinerary: EditItinerary): Observable<Itinerary> {
    return this.http.put<Itinerary>(`${this.apiUrl}/${id}`, itinerary);
  }

  delete(id: string): Observable<Itinerary> {
    return this.http.delete<Itinerary>(`${this.apiUrl}/${id}`);
  }
}
