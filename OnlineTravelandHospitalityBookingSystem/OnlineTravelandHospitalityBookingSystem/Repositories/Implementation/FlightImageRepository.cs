using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class FlightImageRepository : IFlightImageRepository
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor contextAccessor;
        private readonly ApplicationDbContext db;

        public FlightImageRepository(IWebHostEnvironment env, IHttpContextAccessor contextAccessor, ApplicationDbContext db)
        {
            this.env = env;
            this.contextAccessor = contextAccessor;
            this.db = db;
        }

        public async Task<FlightImage> UploadAsync(IFormFile file, FlightImage image)
        {
            var folderPath = Path.Combine(env.ContentRootPath, "FlightImages");
            if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, $"{image.FileName}{image.FileExtension}");
            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var request = contextAccessor.HttpContext.Request;
            image.Url = $"{request.Scheme}://{request.Host}{request.PathBase}/FlightImages/{image.FileName}{image.FileExtension}";
            image.DateCreated = DateTime.UtcNow;

            await db.FlightImages.AddAsync(image);
            await db.SaveChangesAsync();

            return image;
        }

        public async Task<IEnumerable<FlightImage>> GetImagesByFlightIdAsync(Guid flightId)
        {
            return await db.FlightImages.Where(i => i.FlightID == flightId).ToListAsync();
        }
    }
}
