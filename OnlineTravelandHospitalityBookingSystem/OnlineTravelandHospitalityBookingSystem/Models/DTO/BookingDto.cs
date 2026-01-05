namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class BookingDto
    {
        public Guid BookingID { get; set; }
        public Guid UserID { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }

        public Guid? Payment2Id { get; set; } // ✅ Updated to match new FK
    }
}
