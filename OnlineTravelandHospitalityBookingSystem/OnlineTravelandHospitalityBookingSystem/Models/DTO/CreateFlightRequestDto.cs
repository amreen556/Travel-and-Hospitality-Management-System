namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateFlightRequestDto
    {
        public string Airline { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public decimal Price { get; set; }
        public int Availability { get; set; }

    }
}
