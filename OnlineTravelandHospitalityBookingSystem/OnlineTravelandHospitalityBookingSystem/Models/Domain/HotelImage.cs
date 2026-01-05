using OnlineTravelandHospitalityBookingSystem.Models.Domain;

public class HotelImage
{
    public Guid Id { get; set; }
    public string FileName { get; set; }
    public string FileExtension { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public DateTime DateCreated { get; set; }

    public Guid HotelID { get; set; }           // Foreign key
    public Hotel Hotel { get; set; }            // Navigation property
}
