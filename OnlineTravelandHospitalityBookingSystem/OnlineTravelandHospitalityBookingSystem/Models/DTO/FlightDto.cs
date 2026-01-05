namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class FlightDto
    {
        public Guid FlightID { get; set; }
        public string Airline { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public decimal Price { get; set; }
        public int Availability { get; set; }

    }
}
