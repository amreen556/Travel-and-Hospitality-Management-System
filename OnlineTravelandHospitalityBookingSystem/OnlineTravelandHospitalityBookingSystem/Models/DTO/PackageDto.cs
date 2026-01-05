namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class PackageDto
    {
        public Guid PackageID { get; set; }
        public string Name { get; set; }
        public string IncludedHotels { get; set; }
        public string IncludedFlights { get; set; }
        public string Activities { get; set; }
        public decimal Price { get; set; }
    }
}
