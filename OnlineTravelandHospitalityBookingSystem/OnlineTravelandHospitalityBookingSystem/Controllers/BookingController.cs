using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository bookingRepository;

        public BookingController(IBookingRepository bookingRepository)
        {
            this.bookingRepository = bookingRepository;
        }

        // GET: api/booking
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await bookingRepository.GetAllAsync();
            var bookingDtos = bookings.Select(b => new BookingDto
            {
                BookingID = b.BookingID,
                UserID = b.UserID,
                Type = b.Type,
                Status = b.Status,
                Payment2Id = b.Payment2Id // ✅ Updated
            });

            return Ok(bookingDtos);
        }

        // GET: api/booking/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var booking = await bookingRepository.GetByIdAsync(id);
            if (booking == null) return NotFound();

            var bookingDto = new BookingDto
            {
                BookingID = booking.BookingID,
                UserID = booking.UserID,
                Type = booking.Type,
                Status = booking.Status,
                Payment2Id = booking.Payment2Id // ✅ Updated
            };

            return Ok(bookingDto);
        }

        // POST: api/booking
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingRequestDto request)
        {
            var booking = new Booking
            {
                UserID = request.UserID,
                Type = request.Type,
                Status = request.Status,
                Payment2Id = request.Payment2Id // ✅ Updated
            };

            booking = await bookingRepository.AddAsync(booking);

            var bookingDto = new BookingDto
            {
                BookingID = booking.BookingID,
                UserID = booking.UserID,
                Type = booking.Type,
                Status = booking.Status,
                Payment2Id = booking.Payment2Id // ✅ Updated
            };

            return CreatedAtAction(nameof(GetById), new { id = bookingDto.BookingID }, bookingDto);
        }

        // PUT: api/booking/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateBookingRequestDto request)
        {
            var booking = new Booking
            {
                Type = request.Type,
                Status = request.Status,
                Payment2Id = request.Payment2Id // ✅ Updated
            };

            var updatedBooking = await bookingRepository.UpdateAsync(id, booking);
            if (updatedBooking == null) return NotFound();

            var bookingDto = new BookingDto
            {
                BookingID = updatedBooking.BookingID,
                UserID = updatedBooking.UserID,
                Type = updatedBooking.Type,
                Status = updatedBooking.Status,
                Payment2Id = updatedBooking.Payment2Id // ✅ Updated
            };

            return Ok(bookingDto);
        }

        // DELETE: api/booking/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedBooking = await bookingRepository.DeleteAsync(id);
            if (deletedBooking == null) return NotFound();

            var bookingDto = new BookingDto
            {
                BookingID = deletedBooking.BookingID,
                UserID = deletedBooking.UserID,
                Type = deletedBooking.Type,
                Status = deletedBooking.Status,
                Payment2Id = deletedBooking.Payment2Id // ✅ Updated
            };

            return Ok(bookingDto);
        }
    }
}
