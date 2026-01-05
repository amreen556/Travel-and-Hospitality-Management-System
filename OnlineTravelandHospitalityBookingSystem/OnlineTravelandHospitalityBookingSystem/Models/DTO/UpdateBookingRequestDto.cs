namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class UpdateBookingRequestDto
    {
        public string Type { get; set; }
        public string Status { get; set; }
        public Guid? Payment2Id { get; set; } // ✅ Updated to match new FK
    }
}
