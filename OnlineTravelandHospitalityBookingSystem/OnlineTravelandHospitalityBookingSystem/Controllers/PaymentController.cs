using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository paymentRepository;

        public PaymentController(IPaymentRepository paymentRepository)
        {
            this.paymentRepository = paymentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var payments = await paymentRepository.GetAllAsync();
            var dtoList = payments.Select(p => new PaymentDto
            {
                PaymentID = p.PaymentID,
                BookingID = p.BookingID,
                UserID = p.UserID,
                Amount = p.Amount,
                Status = p.Status,
                PaymentMethod = p.PaymentMethod
            });
            return Ok(dtoList);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var payment = await paymentRepository.GetByIdAsync(id);
            if (payment == null) return NotFound();

            var dto = new PaymentDto
            {
                PaymentID = payment.PaymentID,
                BookingID = payment.BookingID,
                UserID = payment.UserID,
                Amount = payment.Amount,
                Status = payment.Status,
                PaymentMethod = payment.PaymentMethod
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePaymentRequestDto request)
        {
            var payment = new Payment
            {
                BookingID = request.BookingID,
                UserID = request.UserID,
                Amount = request.Amount,
                Status = request.Status,
                PaymentMethod = request.PaymentMethod
            };
            payment = await paymentRepository.AddAsync(payment);

            var dto = new PaymentDto
            {
                PaymentID = payment.PaymentID,
                BookingID = payment.BookingID,
                UserID = payment.UserID,
                Amount = payment.Amount,
                Status = payment.Status,
                PaymentMethod = payment.PaymentMethod
            };
            return CreatedAtAction(nameof(GetById), new { id = dto.PaymentID }, dto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePaymentRequestDto request)
        {
            var payment = new Payment
            {
                BookingID = request.BookingID,
                UserID = request.UserID,
                Amount = request.Amount,
                Status = request.Status,
                PaymentMethod = request.PaymentMethod
            };
            var updated = await paymentRepository.UpdateAsync(id, payment);
            if (updated == null) return NotFound();

            var dto = new PaymentDto
            {
                PaymentID = updated.PaymentID,
                BookingID = updated.BookingID,
                UserID = updated.UserID,
                Amount = updated.Amount,
                Status = updated.Status,
                PaymentMethod = updated.PaymentMethod
            };
            return Ok(dto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await paymentRepository.DeleteAsync(id);
            if (deleted == null) return NotFound();

            var dto = new PaymentDto
            {
                PaymentID = deleted.PaymentID,
                BookingID = deleted.BookingID,
                UserID = deleted.UserID,
                Amount = deleted.Amount,
                Status = deleted.Status,
                PaymentMethod = deleted.PaymentMethod
            };
            return Ok(dto);
        }
    }

}
