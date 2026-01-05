namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class Itinerary
    {
        public Guid ItineraryID { get; set; }
        public Guid UserID { get; set; }
        public User User { get; set; }
        public Guid PackageID { get; set; }
        public Package Package { get; set; }
        public string CustomizationDetails { get; set; }
    }
}