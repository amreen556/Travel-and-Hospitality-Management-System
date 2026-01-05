using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface ISupportTicketRepository
    {
        Task<IEnumerable<SupportTicket>> GetAllAsync();
        Task<SupportTicket?> GetByIdAsync(Guid id);
        Task<SupportTicket> AddAsync(SupportTicket ticket);
        Task<SupportTicket?> UpdateAsync(Guid id, SupportTicket ticket);
        Task<SupportTicket?> DeleteAsync(Guid id);
    }
}
