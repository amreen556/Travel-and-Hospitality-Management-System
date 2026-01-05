using OnlineTravelandHospitalityBookingSystem.Models.Domain;

public class Booking
{
    public Guid BookingID { get; set; }
    public Guid UserID { get; set; }
    public User User { get; set; }
    public string Type { get; set; }
    public string Status { get; set; }

    // Navigation property for Payment (can be nullable)

    public Guid? Payment2Id { get; set; }
    public Payment2? Payment2 { get; set; }


}