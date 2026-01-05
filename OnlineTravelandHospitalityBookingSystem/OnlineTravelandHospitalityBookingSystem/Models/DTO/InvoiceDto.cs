namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class InvoiceDto
    {
        public Guid InvoiceID { get; set; }
        public Guid BookingID { get; set; }
        public Guid UserID { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
