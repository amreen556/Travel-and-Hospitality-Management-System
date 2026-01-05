using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Data;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;
using OnlineTravelandHospitalityBookingSystem.Repositories.Interface;

namespace OnlineTravelandHospitalityBookingSystem.Repositories.Implementation
{
    public class PackageRepository : IPackageRepository

    {

        private readonly ApplicationDbContext _dbContext;

        public PackageRepository(ApplicationDbContext dbContext)

        {

            _dbContext = dbContext;

        }

        public async Task<IEnumerable<Package>> GetAllAsync()

        {

            return await _dbContext.Packages.ToListAsync();

        }

        public async Task<Package?> GetByIdAsync(Guid id)

        {

            return await _dbContext.Packages.FirstOrDefaultAsync(p => p.PackageID == id);

        }

        public async Task<Package> AddAsync(Package package)

        {

            await _dbContext.Packages.AddAsync(package);

            await _dbContext.SaveChangesAsync();

            return package;

        }

        public async Task<Package?> UpdateAsync(Guid id, Package package)

        {

            var existingPackage = await _dbContext.Packages.FindAsync(id);

            if (existingPackage == null) return null;

            existingPackage.Name = package.Name;

            existingPackage.IncludedHotels = package.IncludedHotels;

            existingPackage.IncludedFlights = package.IncludedFlights;

            existingPackage.Activities = package.Activities;

            existingPackage.Price = package.Price;

            await _dbContext.SaveChangesAsync();

            return existingPackage;

        }

        public async Task<Package?> DeleteAsync(Guid id)

        {

            var package = await _dbContext.Packages.FindAsync(id);

            if (package == null) return null;

            _dbContext.Packages.Remove(package);

            await _dbContext.SaveChangesAsync();

            return package;

        }

    }


}
