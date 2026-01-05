using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItineraryController : ControllerBase
    {
        private readonly IItineraryRepository itineraryRepository;

        public ItineraryController(IItineraryRepository itineraryRepository)
        {
            this.itineraryRepository = itineraryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var itineraries = await itineraryRepository.GetAllAsync();
            var dtoList = itineraries.Select(i => new ItineraryDto
            {
                ItineraryID = i.ItineraryID,
                UserID = i.UserID,
                PackageID = i.PackageID,
                CustomizationDetails = i.CustomizationDetails
            });
            return Ok(dtoList);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var itinerary = await itineraryRepository.GetByIdAsync(id);
            if (itinerary == null) return NotFound();

            var dto = new ItineraryDto
            {
                ItineraryID = itinerary.ItineraryID,
                UserID = itinerary.UserID,
                PackageID = itinerary.PackageID,
                CustomizationDetails = itinerary.CustomizationDetails
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateItineraryRequestDto request)
        {
            var itinerary = new Itinerary
            {
                UserID = request.UserID,
                PackageID = request.PackageID,
                CustomizationDetails = request.CustomizationDetails
            };
            itinerary = await itineraryRepository.AddAsync(itinerary);

            var dto = new ItineraryDto
            {
                ItineraryID = itinerary.ItineraryID,
                UserID = itinerary.UserID,
                PackageID = itinerary.PackageID,
                CustomizationDetails = itinerary.CustomizationDetails
            };
            return CreatedAtAction(nameof(GetById), new { id = dto.ItineraryID }, dto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateItineraryRequestDto request)
        {
            var itinerary = new Itinerary
            {
                UserID = request.UserID,
                PackageID = request.PackageID,
                CustomizationDetails = request.CustomizationDetails
            };
            var updated = await itineraryRepository.UpdateAsync(id, itinerary);
            if (updated == null) return NotFound();

            var dto = new ItineraryDto
            {
                ItineraryID = updated.ItineraryID,
                UserID = updated.UserID,
                PackageID = updated.PackageID,
                CustomizationDetails = updated.CustomizationDetails
            };
            return Ok(dto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await itineraryRepository.DeleteAsync(id);
            if (deleted == null) return NotFound();

            var dto = new ItineraryDto
            {
                ItineraryID = deleted.ItineraryID,
                UserID = deleted.UserID,
                PackageID = deleted.PackageID,
                CustomizationDetails = deleted.CustomizationDetails
            };
            return Ok(dto);
        }
    }


}
