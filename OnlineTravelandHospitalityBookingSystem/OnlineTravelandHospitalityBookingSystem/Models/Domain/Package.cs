namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class Package
    {
        public Guid PackageID { get; set; }
        public string Name { get; set; }
        public string IncludedHotels { get; set; } // Could be a comma-separated string or JSON
        public string IncludedFlights { get; set; }
        public string Activities { get; set; }
        public decimal Price { get; set; }

        public ICollection<Itinerary> Itineraries { get; set; } = new List<Itinerary>();

        // ✅ Added for image relationship
        public ICollection<PackageImage> Images { get; set; } = new List<PackageImage>();
    }
}
