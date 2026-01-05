using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public InvoiceRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Invoice>> GetAllAsync()
        {
            return await _dbContext.Invoices.ToListAsync();
        }

        public async Task<Invoice?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Invoices.FirstOrDefaultAsync(i => i.InvoiceID == id);
        }

        public async Task<Invoice> AddAsync(Invoice invoice)
        {
            invoice.Timestamp = DateTime.UtcNow;
            await _dbContext.Invoices.AddAsync(invoice);
            await _dbContext.SaveChangesAsync();
            return invoice;
        }

        public async Task<Invoice?> UpdateAsync(Guid id, Invoice invoice)
        {
            var existing = await _dbContext.Invoices.FindAsync(id);
            if (existing == null) return null;

            existing.BookingID = invoice.BookingID;
            existing.UserID = invoice.UserID;
            existing.TotalAmount = invoice.TotalAmount;
            existing.Timestamp = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task<Invoice?> DeleteAsync(Guid id)
        {
            var invoice = await _dbContext.Invoices.FindAsync(id);
            if (invoice == null) return null;

            _dbContext.Invoices.Remove(invoice);
            await _dbContext.SaveChangesAsync();
            return invoice;
        }
    }

}
