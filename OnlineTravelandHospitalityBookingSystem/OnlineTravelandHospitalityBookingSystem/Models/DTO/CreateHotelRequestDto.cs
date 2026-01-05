namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateHotelRequestDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public int RoomsAvailable { get; set; }
        public double Rating { get; set; }
        public decimal PricePerNight { get; set; }
    }
}
