using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class ItineraryRepository : IItineraryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ItineraryRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Itinerary>> GetAllAsync()
        {
            return await _dbContext.Itineraries.ToListAsync();
        }

        public async Task<Itinerary?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Itineraries.FirstOrDefaultAsync(i => i.ItineraryID == id);
        }

        public async Task<Itinerary> AddAsync(Itinerary itinerary)
        {
            await _dbContext.Itineraries.AddAsync(itinerary);
            await _dbContext.SaveChangesAsync();
            return itinerary;
        }

        public async Task<Itinerary?> UpdateAsync(Guid id, Itinerary itinerary)
        {
            var existing = await _dbContext.Itineraries.FindAsync(id);
            if (existing == null) return null;

            existing.UserID = itinerary.UserID;
            existing.PackageID = itinerary.PackageID;
            existing.CustomizationDetails = itinerary.CustomizationDetails;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task<Itinerary?> DeleteAsync(Guid id)
        {
            var itinerary = await _dbContext.Itineraries.FindAsync(id);
            if (itinerary == null) return null;

            _dbContext.Itineraries.Remove(itinerary);
            await _dbContext.SaveChangesAsync();
            return itinerary;
        }
    }

}
