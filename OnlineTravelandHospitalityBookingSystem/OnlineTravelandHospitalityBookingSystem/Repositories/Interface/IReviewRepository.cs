using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetAllAsync();
        Task<Review?> GetByIdAsync(Guid id);
        Task<Review> AddAsync(Review review);
        Task<Review?> UpdateAsync(Guid id, Review review);
        Task<Review?> DeleteAsync(Guid id);
    }
}
