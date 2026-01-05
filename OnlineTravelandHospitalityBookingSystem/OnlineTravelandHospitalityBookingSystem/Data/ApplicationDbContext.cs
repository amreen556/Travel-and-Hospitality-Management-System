using Microsoft.EntityFrameworkCore;
using OnlineTravelandHospitalityBookingSystem.Models.Domain;

namespace OnlineTravelandHospitalityBookingSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<Itinerary> Itineraries { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Payment> Payments { get; set; } // Optional: keep if legacy logic still uses it
        public DbSet<Payment2> Payments2 { get; set; }

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<SupportTicket> SupportTickets { get; set; }

        public DbSet<OrderBasket> OrderBaskets { get; set; }
        public DbSet<OrderBasketItem> OrderBasketItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        public DbSet<HotelImage> HotelImages { get; set; }
        public DbSet<FlightImage> FlightImages { get; set; }
        public DbSet<PackageImage> PackageImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set decimal precision
            modelBuilder.Entity<Flight>()
                .Property(f => f.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Hotel>()
                .Property(h => h.PricePerNight)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Package>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Invoice>()
                .Property(i => i.TotalAmount)
                .HasColumnType("decimal(18,2)");

            // ✅ Booking <-> Payment2 (Optional FK in Booking)
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Payment2)
                .WithMany() // No back-reference from Payment2
                .HasForeignKey(b => b.Payment2Id)
                .OnDelete(DeleteBehavior.SetNull);

            // Payment <-> User (legacy Payment)
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            //// Review <-> Hotel
            //modelBuilder.Entity<Review>()
            //    .HasOne(r => r.Hotel)
            //    .WithMany(h => h.Reviews)
            //    .HasForeignKey(r => r.HotelID)
            //    .OnDelete(DeleteBehavior.Cascade);

            // Review <-> User
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Itinerary <-> User
            modelBuilder.Entity<Itinerary>()
                .HasOne(i => i.User)
                .WithMany(u => u.Itineraries)
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Itinerary <-> Package
            modelBuilder.Entity<Itinerary>()
                .HasOne(i => i.Package)
                .WithMany(p => p.Itineraries)
                .HasForeignKey(i => i.PackageID)
                .OnDelete(DeleteBehavior.Cascade);

            // Invoice <-> Booking
            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Booking)
                .WithMany()
                .HasForeignKey(i => i.BookingID)
                .OnDelete(DeleteBehavior.Cascade);

            // Invoice <-> User
            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.User)
                .WithMany(u => u.Invoices)
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // SupportTicket <-> User
            modelBuilder.Entity<SupportTicket>()
                .HasOne(t => t.User)
                .WithMany(u => u.SupportTickets)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // HotelImage <-> Hotel
            modelBuilder.Entity<HotelImage>()
                .HasOne(img => img.Hotel)
                .WithMany(h => h.Images)
                .HasForeignKey(img => img.HotelID)
                .OnDelete(DeleteBehavior.Cascade);

            // FlightImage <-> Flight
            modelBuilder.Entity<FlightImage>()
                .HasOne(img => img.Flight)
                .WithMany(f => f.Images)
                .HasForeignKey(img => img.FlightID)
                .OnDelete(DeleteBehavior.Cascade);

            // PackageImage <-> Package
            modelBuilder.Entity<PackageImage>()
                .HasOne(img => img.Package)
                .WithMany(p => p.Images)
                .HasForeignKey(img => img.PackageID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
