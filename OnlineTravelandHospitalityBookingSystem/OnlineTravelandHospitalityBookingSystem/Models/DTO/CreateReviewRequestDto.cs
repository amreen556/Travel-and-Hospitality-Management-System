namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateReviewRequestDto
    {
        public Guid UserID { get; set; }
        public Guid ProductId { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }
    }
}
