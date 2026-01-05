using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interfaces;


namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementations
{
    public class FlightRepository : IFlightRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public FlightRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Flight>> GetAllAsync()
        {
            return await _dbContext.Flights.ToListAsync();
        }

        public async Task<Flight?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Flights.FirstOrDefaultAsync(f => f.FlightID == id);
        }

        public async Task<Flight> AddAsync(Flight flight)
        {
            await _dbContext.Flights.AddAsync(flight);
            await _dbContext.SaveChangesAsync();
            return flight;
        }

        public async Task<Flight?> UpdateAsync(Guid id, Flight flight)
        {
            var existingFlight = await _dbContext.Flights.FindAsync(id);
            if (existingFlight == null) return null;

            existingFlight.Airline = flight.Airline;
            existingFlight.Departure = flight.Departure;
            existingFlight.Arrival = flight.Arrival;
            existingFlight.Price = flight.Price;
            existingFlight.Availability = flight.Availability;

            await _dbContext.SaveChangesAsync();
            return existingFlight;
        }

        public async Task<Flight?> DeleteAsync(Guid id)
        {
            var flight = await _dbContext.Flights.FindAsync(id);
            if (flight == null) return null;

            _dbContext.Flights.Remove(flight);
            await _dbContext.SaveChangesAsync();
            return flight;
        }
    }
}