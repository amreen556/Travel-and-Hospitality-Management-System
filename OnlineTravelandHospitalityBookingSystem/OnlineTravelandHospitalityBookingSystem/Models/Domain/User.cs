namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class User
    {
        public Guid UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string ContactNumber { get; set; }

        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Itinerary> Itineraries { get; set; } = new List<Itinerary>();
        public ICollection<SupportTicket> SupportTickets { get; set; } = new List<SupportTicket>();

        // Add these lines:
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
    }
}