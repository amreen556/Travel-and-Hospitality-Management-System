using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public PaymentRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            return await _dbContext.Payments.ToListAsync();
        }

        public async Task<Payment?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Payments.FirstOrDefaultAsync(p => p.PaymentID == id);
        }

        public async Task<Payment> AddAsync(Payment payment)
        {
            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.SaveChangesAsync();
            return payment;
        }

        public async Task<Payment?> UpdateAsync(Guid id, Payment payment)
        {
            var existing = await _dbContext.Payments.FindAsync(id);
            if (existing == null) return null;

            existing.BookingID = payment.BookingID;
            existing.UserID = payment.UserID;
            existing.Amount = payment.Amount;
            existing.Status = payment.Status;
            existing.PaymentMethod = payment.PaymentMethod;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task<Payment?> DeleteAsync(Guid id)
        {
            var payment = await _dbContext.Payments.FindAsync(id);
            if (payment == null) return null;

            _dbContext.Payments.Remove(payment);
            await _dbContext.SaveChangesAsync();
            return payment;
        }
    }

}
