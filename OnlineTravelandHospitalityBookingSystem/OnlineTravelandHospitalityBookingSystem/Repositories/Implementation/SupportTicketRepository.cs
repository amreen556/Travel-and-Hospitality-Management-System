using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class SupportTicketRepository : ISupportTicketRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public SupportTicketRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<SupportTicket>> GetAllAsync()
        {
            return await _dbContext.SupportTickets.ToListAsync();
        }

        public async Task<SupportTicket?> GetByIdAsync(Guid id)
        {
            return await _dbContext.SupportTickets.FirstOrDefaultAsync(t => t.TicketID == id);
        }

        public async Task<SupportTicket> AddAsync(SupportTicket ticket)
        {
            await _dbContext.SupportTickets.AddAsync(ticket);
            await _dbContext.SaveChangesAsync();
            return ticket;
        }

        public async Task<SupportTicket?> UpdateAsync(Guid id, SupportTicket ticket)
        {
            var existing = await _dbContext.SupportTickets.FindAsync(id);
            if (existing == null) return null;

            existing.UserID = ticket.UserID;
            existing.Issue = ticket.Issue;
            existing.Status = ticket.Status;
            existing.AssignedAgent = ticket.AssignedAgent;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task<SupportTicket?> DeleteAsync(Guid id)
        {
            var ticket = await _dbContext.SupportTickets.FindAsync(id);
            if (ticket == null) return null;

            _dbContext.SupportTickets.Remove(ticket);
            await _dbContext.SaveChangesAsync();
            return ticket;
        }
    }

}
