using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceRepository invoiceRepository;

        public InvoiceController(IInvoiceRepository invoiceRepository)
        {
            this.invoiceRepository = invoiceRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var invoices = await invoiceRepository.GetAllAsync();
            var dtoList = invoices.Select(i => new InvoiceDto
            {
                InvoiceID = i.InvoiceID,
                BookingID = i.BookingID,
                UserID = i.UserID,
                TotalAmount = i.TotalAmount,
                Timestamp = i.Timestamp
            });
            return Ok(dtoList);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var invoice = await invoiceRepository.GetByIdAsync(id);
            if (invoice == null) return NotFound();

            var dto = new InvoiceDto
            {
                InvoiceID = invoice.InvoiceID,
                BookingID = invoice.BookingID,
                UserID = invoice.UserID,
                TotalAmount = invoice.TotalAmount,
                Timestamp = invoice.Timestamp
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateInvoiceRequestDto request)
        {
            var invoice = new Invoice
            {
                BookingID = request.BookingID,
                UserID = request.UserID,
                TotalAmount = request.TotalAmount
            };
            invoice = await invoiceRepository.AddAsync(invoice);

            var dto = new InvoiceDto
            {
                InvoiceID = invoice.InvoiceID,
                BookingID = invoice.BookingID,
                UserID = invoice.UserID,
                TotalAmount = invoice.TotalAmount,
                Timestamp = invoice.Timestamp
            };
            return CreatedAtAction(nameof(GetById), new { id = dto.InvoiceID }, dto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateInvoiceRequestDto request)
        {
            var invoice = new Invoice
            {
                BookingID = request.BookingID,
                UserID = request.UserID,
                TotalAmount = request.TotalAmount
            };
            var updated = await invoiceRepository.UpdateAsync(id, invoice);
            if (updated == null) return NotFound();

            var dto = new InvoiceDto
            {
                InvoiceID = updated.InvoiceID,
                BookingID = updated.BookingID,
                UserID = updated.UserID,
                TotalAmount = updated.TotalAmount,
                Timestamp = updated.Timestamp
            };
            return Ok(dto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await invoiceRepository.DeleteAsync(id);
            if (deleted == null) return NotFound();

            var dto = new InvoiceDto
            {
                InvoiceID = deleted.InvoiceID,
                BookingID = deleted.BookingID,
                UserID = deleted.UserID,
                TotalAmount = deleted.TotalAmount,
                Timestamp = deleted.Timestamp
            };
            return Ok(dto);
        }
    }

}
