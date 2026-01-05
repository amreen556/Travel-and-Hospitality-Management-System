using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IItineraryRepository
    {
        Task<IEnumerable<Itinerary>> GetAllAsync();
        Task<Itinerary?> GetByIdAsync(Guid id);
        Task<Itinerary> AddAsync(Itinerary itinerary);
        Task<Itinerary?> UpdateAsync(Guid id, Itinerary itinerary);
        Task<Itinerary?> DeleteAsync(Guid id);
    }

}
