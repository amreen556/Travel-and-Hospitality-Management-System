namespace OnlineTravelandHospitalityBookingSystem.Repositories.Interface
{

    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllAsync();
        Task<Booking?> GetByIdAsync(Guid bookingId);
        Task<Booking> AddAsync(Booking booking);
        Task<Booking?> UpdateAsync(Guid bookingId, Booking booking);
        Task<Booking?> DeleteAsync(Guid bookingId);
    }

}
