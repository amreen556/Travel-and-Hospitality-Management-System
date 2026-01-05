namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class Flight
    {
        public Guid FlightID { get; set; }
        public string Airline { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public decimal Price { get; set; }
        public int Availability { get; set; }

        // ✅ Added for image relationship
        public ICollection<FlightImage> Images { get; set; } = new List<FlightImage>();
    }
}
