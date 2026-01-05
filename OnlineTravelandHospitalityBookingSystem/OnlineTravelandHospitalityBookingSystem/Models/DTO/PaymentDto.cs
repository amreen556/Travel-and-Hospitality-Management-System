namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class PaymentDto
    {
        public Guid PaymentID { get; set; }
        public Guid BookingID { get; set; }
        public Guid UserID { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
    }
}
