using Microsoft.AspNetCore.Mvc;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Models.DTO;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await userRepository.GetAllAsync();
            var dtoList = users.Select(u => new UserDto
            {
                UserID = u.UserID,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role,
                ContactNumber = u.ContactNumber
            });
            return Ok(dtoList);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var user = await userRepository.GetByIdAsync(id);
            if (user == null) return NotFound();

            var dto = new UserDto
            {
                UserID = user.UserID,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                ContactNumber = user.ContactNumber
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequestDto request)
        {
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                Role = request.Role,
                ContactNumber = request.ContactNumber
            };
            user = await userRepository.AddAsync(user);

            var dto = new UserDto
            {
                UserID = user.UserID,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                ContactNumber = user.ContactNumber
            };
            return CreatedAtAction(nameof(GetById), new { id = dto.UserID }, dto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateUserRequestDto request)
        {
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                Role = request.Role,
                ContactNumber = request.ContactNumber
            };
            var updated = await userRepository.UpdateAsync(id, user);
            if (updated == null) return NotFound();

            var dto = new UserDto
            {
                UserID = updated.UserID,
                Name = updated.Name,
                Email = updated.Email,
                Role = updated.Role,
                ContactNumber = updated.ContactNumber
            };
            return Ok(dto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deleted = await userRepository.DeleteAsync(id);
            if (deleted == null) return NotFound();

            var dto = new UserDto
            {
                UserID = deleted.UserID,
                Name = deleted.Name,
                Email = deleted.Email,
                Role = deleted.Role,
                ContactNumber = deleted.ContactNumber
            };
            return Ok(dto);
        }
    }
    //controller
}
