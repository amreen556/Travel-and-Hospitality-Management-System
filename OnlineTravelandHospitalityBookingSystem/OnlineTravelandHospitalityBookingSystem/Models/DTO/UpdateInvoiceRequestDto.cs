namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class UpdateInvoiceRequestDto
    {
        public Guid BookingID { get; set; }
        public Guid UserID { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
