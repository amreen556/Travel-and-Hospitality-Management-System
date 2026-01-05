namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateSupportTicketRequestDto
    {
        public Guid UserID { get; set; }
        public string Issue { get; set; }
        public string Status { get; set; }
        public string AssignedAgent { get; set; }
    }
}
