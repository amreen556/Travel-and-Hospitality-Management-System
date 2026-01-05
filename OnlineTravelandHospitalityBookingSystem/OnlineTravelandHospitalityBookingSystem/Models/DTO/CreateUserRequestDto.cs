namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateUserRequestDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string ContactNumber { get; set; }
    }
}
