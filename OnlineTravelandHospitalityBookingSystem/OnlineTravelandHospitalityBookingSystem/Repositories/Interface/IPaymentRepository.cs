using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(Guid id);
        Task<Payment> AddAsync(Payment payment);
        Task<Payment?> UpdateAsync(Guid id, Payment payment);
        Task<Payment?> DeleteAsync(Guid id);
    }


}

