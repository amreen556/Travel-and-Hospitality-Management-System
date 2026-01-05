namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateItineraryRequestDto
    {
        public Guid UserID { get; set; }
        public Guid PackageID { get; set; }
        public string CustomizationDetails { get; set; }
    }
}
