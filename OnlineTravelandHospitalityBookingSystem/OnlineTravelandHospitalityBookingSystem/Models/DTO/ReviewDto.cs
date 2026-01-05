namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class ReviewDto
    {
        public Guid ReviewID { get; set; }
        public Guid UserID { get; set; }
        public Guid ProductId { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
