using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class HotelRepository : IHotelRepository
    {
        private readonly ApplicationDbContext dbContext;

        public HotelRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Hotel>> GetAllAsync()
        {
            return await dbContext.Hotels.ToListAsync();
        }

        public async Task<Hotel?> GetByIdAsync(Guid id)
        {
            return await dbContext.Hotels.FirstOrDefaultAsync(h => h.HotelID == id);
        }

        public async Task<Hotel> AddAsync(Hotel hotel)
        {
            hotel.HotelID = Guid.NewGuid();
            await dbContext.Hotels.AddAsync(hotel);
            await dbContext.SaveChangesAsync();
            return hotel;
        }

        public async Task<Hotel?> UpdateAsync(Guid id, Hotel hotel)
        {
            var existingHotel = await dbContext.Hotels.FirstOrDefaultAsync(h => h.HotelID == id);
            if (existingHotel == null) return null;

            existingHotel.Name = hotel.Name;
            existingHotel.Location = hotel.Location;
            existingHotel.RoomsAvailable = hotel.RoomsAvailable;
            existingHotel.Rating = hotel.Rating;
            existingHotel.PricePerNight = hotel.PricePerNight;

            await dbContext.SaveChangesAsync();
            return existingHotel;
        }

        public async Task<Hotel?> DeleteAsync(Guid id)
        {
            var existingHotel = await dbContext.Hotels.FirstOrDefaultAsync(h => h.HotelID == id);
            if (existingHotel == null) return null;

            dbContext.Hotels.Remove(existingHotel);
            await dbContext.SaveChangesAsync();
            return existingHotel;
        }
    }
}