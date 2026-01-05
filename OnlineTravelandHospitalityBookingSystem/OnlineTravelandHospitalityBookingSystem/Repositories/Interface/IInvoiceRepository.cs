using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IInvoiceRepository
    {
        Task<IEnumerable<Invoice>> GetAllAsync();
        Task<Invoice?> GetByIdAsync(Guid id);
        Task<Invoice> AddAsync(Invoice invoice);
        Task<Invoice?> UpdateAsync(Guid id, Invoice invoice);
        Task<Invoice?> DeleteAsync(Guid id);
    }

}
