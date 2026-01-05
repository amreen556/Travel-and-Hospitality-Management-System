using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ReviewRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Review>> GetAllAsync()
        {
            return await _dbContext.Reviews.ToListAsync();
        }

        public async Task<Review?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Reviews.FirstOrDefaultAsync(r => r.ReviewID == id);
        }

        public async Task<Review> AddAsync(Review review)
        {
            review.Timestamp = DateTime.UtcNow;
            await _dbContext.Reviews.AddAsync(review);
            await _dbContext.SaveChangesAsync();
            return review;
        }

        public async Task<Review?> UpdateAsync(Guid id, Review review)
        {
            var existing = await _dbContext.Reviews.FindAsync(id);
            if (existing == null) return null;

            existing.UserID = review.UserID;
            existing.ProductId = review.ProductId;
            existing.Rating = review.Rating;
            existing.Comment = review.Comment;
            existing.Timestamp = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task<Review?> DeleteAsync(Guid id)
        {
            var review = await _dbContext.Reviews.FindAsync(id);
            if (review == null) return null;

            _dbContext.Reviews.Remove(review);
            await _dbContext.SaveChangesAsync();
            return review;
        }
    }

}
