namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class ItineraryDto
    {
        public Guid ItineraryID { get; set; }
        public Guid UserID { get; set; }
        public Guid PackageID { get; set; }
        public string CustomizationDetails { get; set; }
    }

}
