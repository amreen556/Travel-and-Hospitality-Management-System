using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IHotelRepository
    {
        Task<IEnumerable<Hotel>> GetAllAsync();
        Task<Hotel?> GetByIdAsync(Guid id);
        Task<Hotel> AddAsync(Hotel hotel);
        Task<Hotel?> UpdateAsync(Guid id, Hotel hotel);
        Task<Hotel?> DeleteAsync(Guid id);
    }
}