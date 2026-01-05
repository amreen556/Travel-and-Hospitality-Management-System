using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {
        private readonly IHotelRepository hotelRepository;
        private readonly IHotelImageRepository imageRepository;

        public HotelController(IHotelRepository hotelRepository, IHotelImageRepository imageRepository)
        {
            this.hotelRepository = hotelRepository;
            this.imageRepository = imageRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hotels = await hotelRepository.GetAllAsync();
            var hotelDtos = hotels.Select(h => new HotelDto
            {
                HotelID = h.HotelID,
                Name = h.Name,
                Location = h.Location,
                RoomsAvailable = h.RoomsAvailable,
                Rating = h.Rating,
                PricePerNight = h.PricePerNight
            });
            return Ok(hotelDtos);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var hotel = await hotelRepository.GetByIdAsync(id);
            if (hotel == null) return NotFound();

            var hotelDto = new HotelDto
            {
                HotelID = hotel.HotelID,
                Name = hotel.Name,
                Location = hotel.Location,
                RoomsAvailable = hotel.RoomsAvailable,
                Rating = hotel.Rating,
                PricePerNight = hotel.PricePerNight
            };
            return Ok(hotelDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHotelRequestDto request)
        {
            var hotel = new Hotel
            {
                Name = request.Name,
                Location = request.Location,
                RoomsAvailable = request.RoomsAvailable,
                Rating = request.Rating,
                PricePerNight = request.PricePerNight
            };
            hotel = await hotelRepository.AddAsync(hotel);

            var hotelDto = new HotelDto
            {
                HotelID = hotel.HotelID,
                Name = hotel.Name,
                Location = hotel.Location,
                RoomsAvailable = hotel.RoomsAvailable,
                Rating = hotel.Rating,
                PricePerNight = hotel.PricePerNight
            };
            return CreatedAtAction(nameof(GetById), new { id = hotelDto.HotelID }, hotelDto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateHotelRequestDto request)
        {
            var hotel = new Hotel
            {
                Name = request.Name,
                Location = request.Location,
                RoomsAvailable = request.RoomsAvailable,
                Rating = request.Rating,
                PricePerNight = request.PricePerNight
            };
            var updatedHotel = await hotelRepository.UpdateAsync(id, hotel);
            if (updatedHotel == null) return NotFound();

            var hotelDto = new HotelDto
            {
                HotelID = updatedHotel.HotelID,
                Name = updatedHotel.Name,
                Location = updatedHotel.Location,
                RoomsAvailable = updatedHotel.RoomsAvailable,
                Rating = updatedHotel.Rating,
                PricePerNight = updatedHotel.PricePerNight
            };
            return Ok(hotelDto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedHotel = await hotelRepository.DeleteAsync(id);
            if (deletedHotel == null) return NotFound();

            var hotelDto = new HotelDto
            {
                HotelID = deletedHotel.HotelID,
                Name = deletedHotel.Name,
                Location = deletedHotel.Location,
                RoomsAvailable = deletedHotel.RoomsAvailable,
                Rating = deletedHotel.Rating,
                PricePerNight = deletedHotel.PricePerNight
            };
            return Ok(hotelDto);
        }

        [HttpPost("{hotelId:guid}/upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] UploadHotelImageRequest request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest("No file uploaded.");

            // ✅ Validate HotelID before proceeding
            var hotelExists = await hotelRepository.GetByIdAsync(request.HotelID);
            if (hotelExists == null)
                return BadRequest("Invalid HotelID. No matching hotel found.");

            var image = new HotelImage
            {
                FileName = Path.GetFileNameWithoutExtension(request.File.FileName),
                FileExtension = Path.GetExtension(request.File.FileName),
                Title = request.Title,
                HotelID = request.HotelID
            };

            var uploaded = await imageRepository.UploadAsync(request.File, image);

            var dto = new HotelImageDto
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

        [HttpGet("{hotelId:guid}/images")]
        public async Task<IActionResult> GetImages(Guid hotelId)
        {
            var images = await imageRepository.GetImagesByHotelIdAsync(hotelId);
            var dtos = images.Select(img => new HotelImageDto
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