using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public BookingRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Booking>> GetAllAsync()
        {
            return await _dbContext.Bookings
                .Include(b => b.User)
                .Include(b => b.Payment2) // ✅ Payment2 include stays
                .ToListAsync();
        }

        public async Task<Booking?> GetByIdAsync(Guid bookingId)
        {
            return await _dbContext.Bookings
                .Include(b => b.User)
                .Include(b => b.Payment2) // ✅ Payment2 include stays
                .FirstOrDefaultAsync(b => b.BookingID == bookingId);
        }

        public async Task<Booking> AddAsync(Booking booking)
        {
            await _dbContext.Bookings.AddAsync(booking);
            await _dbContext.SaveChangesAsync();
            return booking;
        }

        public async Task<Booking?> UpdateAsync(Guid bookingId, Booking booking)
        {
            var existingBooking = await _dbContext.Bookings.FindAsync(bookingId);

            if (existingBooking == null)
                return null;

            // ✅ Update only mutable fields; do NOT touch UserID here
            existingBooking.Type = booking.Type;
            existingBooking.Status = booking.Status;
            existingBooking.Payment2Id = booking.Payment2Id; // can be a value or null

            await _dbContext.SaveChangesAsync();
            return existingBooking;
        }

        public async Task<Booking?> DeleteAsync(Guid bookingId)
        {
            var existingBooking = await _dbContext.Bookings.FindAsync(bookingId);

            if (existingBooking == null)
                return null;

            _dbContext.Bookings.Remove(existingBooking);
            await _dbContext.SaveChangesAsync();
            return existingBooking;
        }
    }
}
