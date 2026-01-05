using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IFlightImageRepository
    {
        Task<FlightImage> UploadAsync(IFormFile file, FlightImage image);
        Task<IEnumerable<FlightImage>> GetImagesByFlightIdAsync(Guid flightId);
    }
}
