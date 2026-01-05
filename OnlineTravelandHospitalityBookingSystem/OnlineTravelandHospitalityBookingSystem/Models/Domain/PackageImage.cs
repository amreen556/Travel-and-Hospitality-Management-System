using OnlineTravelandHospitalityBookingSystem.Models.Domain;

public class PackageImage
{
    public Guid Id { get; set; }
    public string FileName { get; set; }
    public string FileExtension { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public DateTime DateCreated { get; set; }

    public Guid PackageID { get; set; }           // Foreign key to Flight/Package
    public Package Package { get; set; }          // Navigation property
}
