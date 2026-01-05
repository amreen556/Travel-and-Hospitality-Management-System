using Microsoft.AspNetCore.Mvc;

namespace OnlineTravelandHospitalityBookingSystem.Models.DTO
{
    public class HotelImageDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public DateTime DateCreated { get; set; }
    }

    public class UploadHotelImageRequest
    {
        [FromForm]
        public IFormFile File { get; set; }

        [FromForm]
        public Guid HotelID { get; set; }

        [FromForm]
        public string Title { get; set; }
    }

}
