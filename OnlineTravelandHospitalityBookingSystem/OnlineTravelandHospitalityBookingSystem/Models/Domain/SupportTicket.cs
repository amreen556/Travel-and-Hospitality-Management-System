using System.ComponentModel.DataAnnotations;

namespace OnlineTravelandHospitalityBookingSystem.Models.Domain
{
    public class SupportTicket
    {
        [Key]
        public Guid TicketID { get; set; } // This is the primary key

        public Guid UserID { get; set; }
        public User User { get; set; }

        public string Issue { get; set; }
        public string Status { get; set; }
        public string AssignedAgent { get; set; }
    }
}