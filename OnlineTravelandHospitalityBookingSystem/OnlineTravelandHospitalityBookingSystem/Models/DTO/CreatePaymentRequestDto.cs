namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreatePaymentRequestDto
    {
        public Guid BookingID { get; set; }
        public Guid UserID { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
    }
}
