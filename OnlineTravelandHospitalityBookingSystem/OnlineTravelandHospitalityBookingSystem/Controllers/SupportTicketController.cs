using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupportTicketController : ControllerBase
    {
        private readonly ISupportTicketRepository supportTicketRepository;

        public SupportTicketController(ISupportTicketRepository supportTicketRepository)
        {
            this.supportTicketRepository = supportTicketRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tickets = await supportTicketRepository.GetAllAsync();
            var dtoList = tickets.Select(t => new SupportTicketDto
            {
                TicketID = t.TicketID,
                UserID = t.UserID,
                Issue = t.Issue,
                Status = t.Status,
                AssignedAgent = t.AssignedAgent
            });
            return Ok(dtoList);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var ticket = await supportTicketRepository.GetByIdAsync(id);
            if (ticket == null) return NotFound();

            var dto = new SupportTicketDto
            {
                TicketID = ticket.TicketID,
                UserID = ticket.UserID,
                Issue = ticket.Issue,
                Status = ticket.Status,
                AssignedAgent = ticket.AssignedAgent
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSupportTicketRequestDto request)
        {
            var ticket = new SupportTicket
            {
                UserID = request.UserID,
                Issue = request.Issue,
                Status = request.Status,
                AssignedAgent = request.AssignedAgent
            };
            ticket = await supportTicketRepository.AddAsync(ticket);

            var dto = new SupportTicketDto
            {
                TicketID = ticket.TicketID,
                UserID = ticket.UserID,
                Issue = ticket.Issue,
                Status = ticket.Status,
                AssignedAgent = ticket.AssignedAgent
            };
            return CreatedAtAction(nameof(GetById), new { id = dto.TicketID }, dto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSupportTicketRequestDto request)
        {
            var ticket = new SupportTicket
            {
                UserID = request.UserID,
                Issue = request.Issue,
                Status = request.Status,
                AssignedAgent = request.AssignedAgent
            };
            var updated = await supportTicketRepository.UpdateAsync(id, ticket);
            if (updated == null) return NotFound();

            var dto = new SupportTicketDto
            {
                TicketID = updated.TicketID,
                UserID = updated.UserID,
                Issue = updated.Issue,
                Status = updated.Status,
                AssignedAgent = updated.AssignedAgent
            };
            return Ok(dto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await supportTicketRepository.DeleteAsync(id);
            if (deleted == null) return NotFound();

            var dto = new SupportTicketDto
            {
                TicketID = deleted.TicketID,
                UserID = deleted.UserID,
                Issue = deleted.Issue,
                Status = deleted.Status,
                AssignedAgent = deleted.AssignedAgent
            };
            return Ok(dto);
        }
    }

}
