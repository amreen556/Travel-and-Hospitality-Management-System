namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class UpdateSupportTicketRequestDto
    {
        public Guid UserID { get; set; }
        public string Issue { get; set; }
        public string Status { get; set; }
        public string AssignedAgent { get; set; }
    }
}
