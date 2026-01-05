using OnlineTravelandHospitalityBookingSystem.Models.Domain;

public class FlightImage
{
    public Guid Id { get; set; }
    public string FileName { get; set; }
    public string FileExtension { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public DateTime DateCreated { get; set; }

    public Guid FlightID { get; set; }           // Foreign key
    public Flight Flight { get; set; }           // Navigation property
}
