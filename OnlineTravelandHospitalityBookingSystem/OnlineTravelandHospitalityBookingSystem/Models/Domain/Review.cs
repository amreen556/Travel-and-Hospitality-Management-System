namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class Review
    {
        public Guid ReviewID { get; set; }
        public Guid UserID { get; set; }
        public User User { get; set; }
        public Guid ProductId { get; set; }
       // public Hotel Hotel { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }
    }
}