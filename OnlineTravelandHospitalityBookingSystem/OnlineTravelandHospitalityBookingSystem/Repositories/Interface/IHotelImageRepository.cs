using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IHotelImageRepository
    {
        Task<HotelImage> UploadAsync(IFormFile file, HotelImage image);
        Task<IEnumerable<HotelImage>> GetImagesByHotelIdAsync(Guid hotelId);
    }

}
