using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace OnlineTravelandHospitalityBookingSystem.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "38e75b6c-b8ec-4951-c481-946a2f8e8642";
            var writerRoleId = "a850f27d-35b2-5335-b8cf-2cc11c8d7904";
            var adminRoleId = "c1a1e2d3-4b5c-6d7e-8f90-123456789abc";

            // Create roles

            // Create Reader and Writer Role
            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                },
                new IdentityRole()
                {
                    Id = adminRoleId,
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = adminRoleId
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);

            // Create an Admin User
            var adminUserId = "f3d378fd-e54d-5f4c-9219-b2b2f92a017e";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "5ync@mapmymoments.com",
                Email = "5ync@mapmymoments.com",
                NormalizedEmail = "5YNC@MAPMYMOMENTS.COM".ToUpper(),
                NormalizedUserName = "5YNC@MAPMYMOMENTS.COM".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "5ync@1000");

            builder.Entity<IdentityUser>().HasData(admin);

            // Give Roles To Admin
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId
                },
                 new IdentityUserRole<string>()
                {
                    UserId = adminUserId,
                    RoleId = adminRoleId // Assign the new Admin role to the admin user
                }
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}