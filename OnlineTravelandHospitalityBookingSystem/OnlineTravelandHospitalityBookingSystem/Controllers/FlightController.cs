using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interfaces;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly IFlightRepository flightRepository;
        private readonly IFlightImageRepository imageRepository;

        public FlightController(IFlightRepository flightRepository, IFlightImageRepository imageRepository)
        {
            this.flightRepository = flightRepository;
            this.imageRepository = imageRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var flights = await flightRepository.GetAllAsync();
            var flightDtos = flights.Select(f => new FlightDto
            {
                FlightID = f.FlightID,
                Airline = f.Airline,
                Departure = f.Departure,
                Arrival = f.Arrival,
                Price = f.Price,
                Availability = f.Availability
            });
            return Ok(flightDtos);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var flight = await flightRepository.GetByIdAsync(id);
            if (flight == null) return NotFound();

            var flightDto = new FlightDto
            {
                FlightID = flight.FlightID,
                Airline = flight.Airline,
                Departure = flight.Departure,
                Arrival = flight.Arrival,
                Price = flight.Price,
                Availability = flight.Availability
            };
            return Ok(flightDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFlightRequestDto request)
        {
            var flight = new Flight
            {
                Airline = request.Airline,
                Departure = request.Departure,
                Arrival = request.Arrival,
                Price = request.Price,
                Availability = request.Availability
            };
            flight = await flightRepository.AddAsync(flight);

            var flightDto = new FlightDto
            {
                FlightID = flight.FlightID,
                Airline = flight.Airline,
                Departure = flight.Departure,
                Arrival = flight.Arrival,
                Price = flight.Price,
                Availability = flight.Availability
            };
            return CreatedAtAction(nameof(GetById), new { id = flightDto.FlightID }, flightDto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateFlightRequestDto request)
        {
            var flight = new Flight
            {
                Airline = request.Airline,
                Departure = request.Departure,
                Arrival = request.Arrival,
                Price = request.Price,
                Availability = request.Availability
            };
            var updatedFlight = await flightRepository.UpdateAsync(id, flight);
            if (updatedFlight == null) return NotFound();

            var flightDto = new FlightDto
            {
                FlightID = updatedFlight.FlightID,
                Airline = updatedFlight.Airline,
                Departure = updatedFlight.Departure,
                Arrival = updatedFlight.Arrival,
                Price = updatedFlight.Price,
                Availability = updatedFlight.Availability
            };
            return Ok(flightDto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedFlight = await flightRepository.DeleteAsync(id);
            if (deletedFlight == null) return NotFound();

            var flightDto = new FlightDto
            {
                FlightID = deletedFlight.FlightID,
                Airline = deletedFlight.Airline,
                Departure = deletedFlight.Departure,
                Arrival = deletedFlight.Arrival,
                Price = deletedFlight.Price,
                Availability = deletedFlight.Availability
            };
            return Ok(flightDto);
        }

        // ✅ Upload flight image
        [HttpPost("{flightId:guid}/upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] UploadFlightImageRequest request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest("No file uploaded.");

            var flightExists = await flightRepository.GetByIdAsync(request.FlightID);
            if (flightExists == null)
                return BadRequest("Invalid FlightID. No matching flight found.");

            var image = new FlightImage
            {
                FileName = Path.GetFileNameWithoutExtension(request.File.FileName),
                FileExtension = Path.GetExtension(request.File.FileName),
                Title = request.Title,
                FlightID = request.FlightID
            };

            var uploaded = await imageRepository.UploadAsync(request.File, image);

            var dto = new FlightImageDto
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

        // ✅ Get flight images
        [HttpGet("{flightId:guid}/images")]
        public async Task<IActionResult> GetImages(Guid flightId)
        {
            var images = await imageRepository.GetImagesByFlightIdAsync(flightId);
            var dtos = images.Select(img => new FlightImageDto
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
