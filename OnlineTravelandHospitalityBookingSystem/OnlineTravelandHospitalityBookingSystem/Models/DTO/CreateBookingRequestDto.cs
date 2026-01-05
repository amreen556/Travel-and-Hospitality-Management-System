namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateBookingRequestDto
    {
        public Guid UserID { get; set; } // ✅ Uncommented for completeness
        public string Type { get; set; }
        public string Status { get; set; }
        public Guid? Payment2Id { get; set; } // ✅ Updated to match new FK
    }
}
