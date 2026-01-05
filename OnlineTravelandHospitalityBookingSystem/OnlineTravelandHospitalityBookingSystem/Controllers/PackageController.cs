using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly IPackageRepository packageRepository;
        private readonly IPackageImageRepository imageRepository;

        public PackageController(IPackageRepository packageRepository, IPackageImageRepository imageRepository)
        {
            this.packageRepository = packageRepository;
            this.imageRepository = imageRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var packages = await packageRepository.GetAllAsync();
            var packageDtos = packages.Select(p => new PackageDto
            {
                PackageID = p.PackageID,
                Name = p.Name,
                IncludedHotels = p.IncludedHotels,
                IncludedFlights = p.IncludedFlights,
                Activities = p.Activities,
                Price = p.Price
            });
            return Ok(packageDtos);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var package = await packageRepository.GetByIdAsync(id);
            if (package == null) return NotFound();

            var packageDto = new PackageDto
            {
                PackageID = package.PackageID,
                Name = package.Name,
                IncludedHotels = package.IncludedHotels,
                IncludedFlights = package.IncludedFlights,
                Activities = package.Activities,
                Price = package.Price
            };
            return Ok(packageDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePackageRequestDto request)
        {
            var package = new Package
            {
                Name = request.Name,
                IncludedHotels = request.IncludedHotels,
                IncludedFlights = request.IncludedFlights,
                Activities = request.Activities,
                Price = request.Price
            };
            package = await packageRepository.AddAsync(package);

            var packageDto = new PackageDto
            {
                PackageID = package.PackageID,
                Name = package.Name,
                IncludedHotels = package.IncludedHotels,
                IncludedFlights = package.IncludedFlights,
                Activities = package.Activities,
                Price = package.Price
            };
            return CreatedAtAction(nameof(GetById), new { id = packageDto.PackageID }, packageDto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdatePackageRequestDto request)
        {
            var package = new Package
            {
                Name = request.Name,
                IncludedHotels = request.IncludedHotels,
                IncludedFlights = request.IncludedFlights,
                Activities = request.Activities,
                Price = request.Price
            };
            var updatedPackage = await packageRepository.UpdateAsync(id, package);
            if (updatedPackage == null) return NotFound();

            var packageDto = new PackageDto
            {
                PackageID = updatedPackage.PackageID,
                Name = updatedPackage.Name,
                IncludedHotels = updatedPackage.IncludedHotels,
                IncludedFlights = updatedPackage.IncludedFlights,
                Activities = updatedPackage.Activities,
                Price = updatedPackage.Price
            };
            return Ok(packageDto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedPackage = await packageRepository.DeleteAsync(id);
            if (deletedPackage == null) return NotFound();

            var packageDto = new PackageDto
            {
                PackageID = deletedPackage.PackageID,
                Name = deletedPackage.Name,
                IncludedHotels = deletedPackage.IncludedHotels,
                IncludedFlights = deletedPackage.IncludedFlights,
                Activities = deletedPackage.Activities,
                Price = deletedPackage.Price
            };
            return Ok(packageDto);
        }

        // ✅ Upload Package Image
        [HttpPost("{packageId:guid}/upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] UploadPackageImageRequest request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest("No file uploaded.");

            var packageExists = await packageRepository.GetByIdAsync(request.PackageID);
            if (packageExists == null)
                return BadRequest("Invalid PackageID. No matching package found.");

            var image = new PackageImage
            {
                FileName = Path.GetFileNameWithoutExtension(request.File.FileName),
                FileExtension = Path.GetExtension(request.File.FileName),
                Title = request.Title,
                PackageID = request.PackageID
            };

            var uploaded = await imageRepository.UploadAsync(request.File, image);

            var dto = new PackageImageDto
            {
                Id = uploaded.Id,
                FileName = uploaded.FileName,
                FileExtension = uploaded.FileExtension,
                Title = uploaded.Title,
                Url = uploaded.Url,
                DateCreated = uploaded.DateCreated
            };

            return Ok(dto);
        }

        // ✅ Get Package Images
        [HttpGet("{packageId:guid}/images")]
        public async Task<IActionResult> GetImages(Guid packageId)
        {
            var images = await imageRepository.GetImagesByPackageIdAsync(packageId);
            var dtos = images.Select(img => new PackageImageDto
            {
                Id = img.Id,
                FileName = img.FileName,
                FileExtension = img.FileExtension,
                Title = img.Title,
                Url = img.Url,
                DateCreated = img.DateCreated
            });

            return Ok(dtos);
        }
    }
}
