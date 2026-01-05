using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IPackageImageRepository
    {
        Task<PackageImage> UploadAsync(IFormFile file, PackageImage image);
        Task<IEnumerable<PackageImage>> GetImagesByPackageIdAsync(Guid packageId);
    }
}
