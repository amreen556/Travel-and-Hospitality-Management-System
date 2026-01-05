using Microsoft.AspNetCore.Mvc;

namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class FlightImageDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public DateTime DateCreated { get; set; }
    }

    public class UploadFlightImageRequest
    {
        [FromForm]
        public IFormFile File { get; set; }

        [FromForm]
        public Guid FlightID { get; set; }

        [FromForm]
        public string Title { get; set; }
    }
}
