using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IPackageRepository
    {
        Task<IEnumerable<Package>> GetAllAsync();
        Task<Package?> GetByIdAsync(Guid id);
        Task<Package> AddAsync(Package package);
        Task<Package?> UpdateAsync(Guid id, Package package);
        Task<Package?> DeleteAsync(Guid id);
    }
}
