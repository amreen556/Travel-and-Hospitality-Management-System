import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicket } from '../models/support-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {
  private apiUrl = 'https://localhost:7132/api/SupportTicket'; // Replace with actual API

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(this.apiUrl);
  }

  updateTicket(ticketID: string, data: Partial<SupportTicket>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${ticketID}`, data);
  }
}
