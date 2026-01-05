namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class Hotel
    {
        public Guid HotelID { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int RoomsAvailable { get; set; }
        public double Rating { get; set; }
        public decimal PricePerNight { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

        // ✅ Added for image relationship
        public ICollection<HotelImage> Images { get; set; } = new List<HotelImage>();
    }
}
