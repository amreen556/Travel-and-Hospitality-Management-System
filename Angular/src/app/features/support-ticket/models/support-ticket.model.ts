export interface SupportTicket {
  ticketID: string;
  userID: string;
  issue: string;
  status: string;
  assignedAgent: string;
  createdAt: string;
  updatedAt?: string;
}
