using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class PackageImageRepository : IPackageImageRepository
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor contextAccessor;
        private readonly ApplicationDbContext db;

        public PackageImageRepository(IWebHostEnvironment env, IHttpContextAccessor contextAccessor, ApplicationDbContext db)
        {
            this.env = env;
            this.contextAccessor = contextAccessor;
            this.db = db;
        }

        public async Task<PackageImage> UploadAsync(IFormFile file, PackageImage image)
        {
            var folderPath = Path.Combine(env.ContentRootPath, "PackageImages");
            if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, $"{image.FileName}{image.FileExtension}");
            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var request = contextAccessor.HttpContext.Request;
            image.Url = $"{request.Scheme}://{request.Host}{request.PathBase}/PackageImages/{image.FileName}{image.FileExtension}";
            image.DateCreated = DateTime.UtcNow;

            await db.PackageImages.AddAsync(image);
            await db.SaveChangesAsync();

            return image;
        }

        public async Task<IEnumerable<PackageImage>> GetImagesByPackageIdAsync(Guid packageId)
        {
            return await db.PackageImages.Where(i => i.PackageID == packageId).ToListAsync();
        }
    }
}
