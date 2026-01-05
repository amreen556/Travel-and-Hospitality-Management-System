namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class Payment
    {
        public Guid PaymentID { get; set; }
        public Guid BookingID { get; set; }
        public Booking Booking { get; set; }
        public Guid UserID { get; set; }
        public User User { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }

        // Many-to-many: Payment <-> Invoice
        public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
        public Guid Id { get; internal set; }
    }
}