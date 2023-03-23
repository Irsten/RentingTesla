using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace RentingTesla.Entities
{
    public class RentingTeslaDbContext : DbContext
    {
        //private string _connectionString = "Server=DESKTOP-VU16TG5;Database=RentingTeslaDb;Trusted_Connection=True";
        //string options = configuration.GetConnectionString("DefaultConnection");

        private readonly IConfiguration _configuration;

        public RentingTeslaDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<ReservationDetails> ReservationsDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .Property(l => l.LocationName)
                .IsRequired();

            modelBuilder.Entity<Car>()
                .Property(c => c.Model)
                .IsRequired();

            modelBuilder.Entity<Car>()
                .Property(c => c.Seats)
                .IsRequired();

            modelBuilder.Entity<Car>()
                .Property(c => c.Range)
                .IsRequired();

            modelBuilder.Entity<Car>()
                .Property(c => c.PricePerDay)
                .IsRequired();

            modelBuilder.Entity<Car>()
                .Property(c => c.LocationId)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(b => b.BorrowerFirstName)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(b => b.BorrowerLastName)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(b => b.BorrowerEmail)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(b => b.BorrowerPhoneNumber)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(r => r.PickupLocation)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(r => r.PickupDate)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(r => r.ReturnLocation)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(r => r.ReturnDate)
                .IsRequired();

            modelBuilder.Entity<ReservationDetails>()
                .Property(r => r.CarId)
                .IsRequired();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
