namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class Invoice
    {
        public Guid InvoiceID { get; set; }

        // Foreign key to Booking
        public Guid BookingID { get; set; }
        public Booking Booking { get; set; }

        // Foreign key to User
        public Guid UserID { get; set; }
        public User User { get; set; }

        public decimal TotalAmount { get; set; }
        public DateTime Timestamp { get; set; }
    }
}