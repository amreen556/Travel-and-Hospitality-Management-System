using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository reviewRepository;

        public ReviewController(IReviewRepository reviewRepository)
        {
            this.reviewRepository = reviewRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await reviewRepository.GetAllAsync();
            var dtoList = reviews.Select(r => new ReviewDto
            {
                ReviewID = r.ReviewID,
                UserID = r.UserID,
                ProductId = r.ProductId,
                Rating = r.Rating,
                Comment = r.Comment,
                Timestamp = r.Timestamp
            });
            return Ok(dtoList);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var review = await reviewRepository.GetByIdAsync(id);
            if (review == null) return NotFound();

            var dto = new ReviewDto
            {
                ReviewID = review.ReviewID,
                UserID = review.UserID,
                ProductId = review.ProductId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = review.Timestamp
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateReviewRequestDto request)
        {
            var review = new Review
            {
                UserID = request.UserID,
                ProductId = request.ProductId,
                Rating = request.Rating,
                Comment = request.Comment
            };
            review = await reviewRepository.AddAsync(review);

            var dto = new ReviewDto
            {
                ReviewID = review.ReviewID,
                UserID = review.UserID,
                ProductId = review.ProductId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = review.Timestamp
            };
            return CreatedAtAction(nameof(GetById), new { id = dto.ReviewID }, dto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateReviewRequestDto request)
        {
            var review = new Review
            {
                UserID = request.UserID,
                ProductId = request.ProductId,
                Rating = request.Rating,
                Comment = request.Comment
            };
            var updated = await reviewRepository.UpdateAsync(id, review);
            if (updated == null) return NotFound();

            var dto = new ReviewDto
            {
                ReviewID = updated.ReviewID,
                UserID = updated.UserID,
                ProductId = updated.ProductId,
                Rating = updated.Rating,
                Comment = updated.Comment,
                Timestamp = updated.Timestamp
            };
            return Ok(dto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await reviewRepository.DeleteAsync(id);
            if (deleted == null) return NotFound();

            var dto = new ReviewDto
            {
                ReviewID = deleted.ReviewID,
                UserID = deleted.UserID,
                ProductId = deleted.ProductId,
                Rating = deleted.Rating,
                Comment = deleted.Comment,
                Timestamp = deleted.Timestamp
            };
            return Ok(dto);
        }
    }

}
