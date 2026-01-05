namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class UpdateItineraryRequestDto
    {
        public Guid UserID { get; set; }
        public Guid PackageID { get; set; }
        public string CustomizationDetails { get; set; }
    }

}
