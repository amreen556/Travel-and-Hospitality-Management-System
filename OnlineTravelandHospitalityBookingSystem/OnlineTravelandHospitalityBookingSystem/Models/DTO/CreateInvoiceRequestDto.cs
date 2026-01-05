namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class CreateInvoiceRequestDto
    {
        public Guid BookingID { get; set; }
        public Guid UserID { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
