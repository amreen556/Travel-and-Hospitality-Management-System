namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class UserDto
    {
        public Guid UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string ContactNumber { get; set; }
    }
}
