import { Component, OnInit } from '@angular/core';
import { SupportTicketService } from './services/support-ticket.service';
import { SupportTicket } from './models/support-ticket.model';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent implements OnInit {
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  selectedStatus: string = '';

  constructor(private ticketService: SupportTicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe(data => {
      this.tickets = data;
      this.filteredTickets = data;
    }, error => {
      console.error('Error loading tickets:', error);
    });
  }

  filterByStatus(): void {
    if (this.selectedStatus) {
      this.filteredTickets = this.tickets.filter(t => t.status.toLowerCase() === this.selectedStatus.toLowerCase());
    } else {
      this.filteredTickets = this.tickets;
    }
  }

  updateTicket(ticket: SupportTicket, statusInput: HTMLSelectElement, agentInput: HTMLInputElement): void {
    const newStatus = statusInput.value;
    const newAgent = agentInput.value;

    if (!newStatus && !newAgent) {
      return; // Nothing to update
    }

    const ticketToUpdate = { ...ticket }; // Create a copy

    if (newStatus) {
      ticketToUpdate.status = newStatus;
    }
    if (newAgent) {
      ticketToUpdate.assignedAgent = newAgent;
    }

    this.ticketService.updateTicket(ticket.ticketID, ticketToUpdate).subscribe(() => {
      this.loadTickets(); // Refresh after update
      statusInput.value = '';
      agentInput.value = '';
    }, error => {
      console.error('Error updating ticket. Full error:', error);
      console.error('Backend validation errors:', error.error);
    });
  }
}