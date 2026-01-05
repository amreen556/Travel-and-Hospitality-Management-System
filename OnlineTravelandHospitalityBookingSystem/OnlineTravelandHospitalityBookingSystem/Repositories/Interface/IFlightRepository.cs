using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interfaces
{
    public interface IFlightRepository
    {
        Task<IEnumerable<Flight>> GetAllAsync();
        Task<Flight?> GetByIdAsync(Guid id);
        Task<Flight> AddAsync(Flight flight);
        Task<Flight?> UpdateAsync(Guid id, Flight flight);
        Task<Flight?> DeleteAsync(Guid id);
    }
}