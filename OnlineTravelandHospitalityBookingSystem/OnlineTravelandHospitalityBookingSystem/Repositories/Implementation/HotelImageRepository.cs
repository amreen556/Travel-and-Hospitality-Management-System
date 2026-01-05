using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class HotelImageRepository : IHotelImageRepository
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor contextAccessor;
        private readonly ApplicationDbContext db;

        public HotelImageRepository(IWebHostEnvironment env, IHttpContextAccessor contextAccessor, ApplicationDbContext db)
        {
            this.env = env;
            this.contextAccessor = contextAccessor;
            this.db = db;
        }

        public async Task<HotelImage> UploadAsync(IFormFile file, HotelImage image)
        {
            var folderPath = Path.Combine(env.ContentRootPath, "HotelImages");
            if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, $"{image.FileName}{image.FileExtension}");
            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var request = contextAccessor.HttpContext.Request;
            image.Url = $"{request.Scheme}://{request.Host}{request.PathBase}/HotelImages/{image.FileName}{image.FileExtension}";
            image.DateCreated = DateTime.UtcNow;

            await db.HotelImages.AddAsync(image);
            await db.SaveChangesAsync();

            return image;
        }

        public async Task<IEnumerable<HotelImage>> GetImagesByHotelIdAsync(Guid hotelId)
        {
            return await db.HotelImages.Where(i => i.HotelID == hotelId).ToListAsync();
        }
    }

}
